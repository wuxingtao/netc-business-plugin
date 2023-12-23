/**
 * @Desc: index
 * @Author: wu xingtao
 * @Date: 2023/12/23
 */
import { createElement, render } from '../../utils/element'

const confirmBox = (
  <div id="confirmBox" class="netc-dialog">
    <div class="netc-dialog__header">标题</div>
    <div class="netc-dialog__content">
      <div className="netc-dialog__message">
        如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。
      </div>
    </div>
    <div className="netc-dialog__footer">
      <button id="confirmBtn" onClick={onConfirm}>确定</button>
      <button id="cancelBtn" onClick={onCancel}>取消</button>
    </div>

  </div>
)

function onConfirm () {
  console.log('用户点击了确认按钮')
  hideConfirmBox()
}

function onCancel () {
  console.log('用户点击了取消按钮')
  hideConfirmBox()
}

function hideConfirmBox () {
  document.getElementById('confirmBox').style.display = 'none'
}

export const openConfirm = () => {
  render(confirmBox, document.body)
}
