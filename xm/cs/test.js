// let user={name:'111',ages:'222'};
// const CS=user;
// console.log(user);
// console.log(CS);
// user.name=22;
// console.log(user);
// console.log(CS);
//
// let [a,b,c]=[1,2]
// console.log(a)
// console.log(b)
// console.log(c)
// if(typeof arr[2]==='undefind'){
//   var c='undefined';
// }
//
//

// let {a=1,b}={a:3,b:2};//a=3 b=2
// let {a:A=1,b}={a:3,b:2};//A=3 b=2

// let {floor,pow}=Math;
// floor(2.2);//2
// pow(2,3)//8
// let [a,b,c]='qwe';//a=q b=w c=e

// console.log('yo...'.includes('y'))//是否存在y
// console.log('yo...'.startsWith('y'))//y是否第一个
// console.log('yo...'.endsWith('y'))//y是否最后一个
// console.log('yo...'.repeat(30))//重复30次
//
// let title='hhhhhhh';
// let tpl= `
//   <div>
//     <span>${title +`<i>252</i>`}</span>
//   </div>
// `;
// console.log(tpl);
//
// let a=Symbol('描述1');
// let b=Symbol('描述2');
// console.log(a);
// console.log(b);
// console.log(a===b);

var user={
  full_name:function(){
    return this.fname+' '+this.lname;
  }
};
user.fname='aa';
user.lname='bb';
console.log(user.full_name());

var user2 =new Proxy({},{
  get:function(obj,prop){
    if(prop='full_name'){
        return obj.fname+" "+obj.lname;
    }
  },
  set:function(obj,prop){
    if(prop='full_name'){
        return obj.fname+" "+obj.lname;
    }
  }
});
user2.fname='aa22';
user2.lname='bb22';
console.log(user2.full_name);

let arr=[1,2,3,3,4,5,6]
let s=new Set(arr);
console.log(s);
console.log(s.size);
s.add(7);
console.log(s);
s.delete(2);
console.log(s);
console.log(s.has(1));

function f() { console.log('I am outside!'); }

(function () {
  //f();
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
