/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
//import 'babel-polyfill'

//import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import PropTypes from 'prop-types'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

//-----------------------------------
// Action creators (Actionを返す)
//-----------------------------------

const SEND_MESSAGE = 'SEND_MESSAGE';
const sendMessageAction = (msg) => {
  return {
    type: SEND_MESSAGE,
    msg
  }
}

//-----------------------------------
// Reducer
//-----------------------------------

// state は、画面に表示するメッセージ文字列
const appReducer = (state = '', action) => {
  switch (action.type) {
  case SEND_MESSAGE:
      return action.msg
  default:
      return state
  }
}

//-----------------------------------
// Component
//-----------------------------------

const AppComponent = ({ msg, onClickToSendMessage, onClickToStop, onClickToSendMessageShared }) => {
  const check_code = `// 例えば、以下のようなコードで判定できます。
if (window.Worker) {
  // 使用可能
} else {
  // 使用不可
}`
  return (
    <div>

      <div className="panel panel-success">
        <div className="panel-heading">(1) Worker (Dedicated Worker)</div>
        <div className="panel-body">
          <h4>(1-1) Workerが使えるかどうかの判定</h4>
          <pre><code>{check_code}</code></pre>
          <p>現在使用しているブラウザの判定結果</p>
          <div className="alert alert-warning" role="alert">結果： {window.Worker ? 'Worker を使うことができます。' : 'Worker が使えません。'}</div>
          <h4>(1-2) Workerにメッセージを送る</h4>
          <ol>
            <li>main側から worker側にスタートのメッセージを送ります。</li>
            <li>worker側では1秒おきに、main側にメッセージを送り始めます。</li>
            <li>main側がメッセージを受け取り度に、画面に経過秒数を表示します。</li>
          </ol>
          <button type="button" onClick={onClickToSendMessage}>Workerにメッセージを送って処理をスタートさせる</button>
          <button type="button" onClick={onClickToStop}>Worker側の処理を止める</button>
          <h4>受け取ったメッセージ</h4>
          <div className="alert alert-warning" role="alert">{msg}</div>
        </div>
      </div>

      <div className="panel panel-success">
        <div className="panel-heading">(2) Shared Worker</div>
        <div className="panel-body">
          <p>以下のボタンを押す度に、<code>new SharedWorker()</code> を実行していますが、すべて1つのオブジェクトを共通できるので、「接続数」の値が増えていきます。</p>
          <button type="button" onClick={onClickToSendMessageShared}>Shared Workerにメッセージを送る</button>
          <output id="result"></output>
        </div>
      </div>
    </div>
  );
};

AppComponent.propTypes = {
  msg: PropTypes.string,
  onClickToSendMessage: PropTypes.func.isRequired,
  onClickToStop: PropTypes.func.isRequired,
  onClickToSendMessageShared: PropTypes.func.isRequired,
};

//-----------------------------------
// Container
//-----------------------------------

const AppContainer = (() => {

  const mapStateToProps = (state/*, ownProps*/) => {
    return {
      msg: state
    };
  }
  
  const mapDispatchToProps = (dispatch) => {

    const MyWorker = require("worker-loader!./worker.js");
    const worker = new MyWorker();

    return {
      onClickToSendMessage() {
        worker.addEventListener("message", (event) => {
          console.log('Recieved a message on the Main side: event.data = ', event.data);
          dispatch(sendMessageAction(event.data.msg));
        });
        worker.postMessage({action: 'start'});
      },
      onClickToStop() {
        worker.postMessage({action: 'stop'});
      },
      onClickToSendMessageShared() {

        const SharedWorker = require('shared-worker-loader!./sharedWorker.js')
        const sworker = new SharedWorker(/*name*/) // name is optional
        sworker.addEventListener("error", (event) => {
          console.error(event);
        }, false);
        sworker.port.addEventListener("message", (event) => {
          console.log('Recieved a message from SharedWorker: evnet.data = ', event.data);
          document.getElementById('result').textContent += `${event.data}, `;
        }, false);
        sworker.port.start()
        sworker.port.postMessage('Hello')
      }
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppComponent);

})();

//-----------------------------------
// Store
//-----------------------------------

const store = createStore(appReducer)

//-----------------------------------
// 画面に表示する
//-----------------------------------

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)

