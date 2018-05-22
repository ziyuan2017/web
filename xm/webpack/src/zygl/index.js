import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';


function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // Lodash，现在由这个脚本导入
  element.innerHTML = _.join(['Hello', 'webpack','lalalala'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  //加载数据
  console.log(Data)
  return element;
}

document.body.appendChild(component());
