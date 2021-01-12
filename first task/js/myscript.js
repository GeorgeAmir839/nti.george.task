//let t = JSON.parse(localStorage.getItem('tasks'))
address = ['nasr city', 'giza', 'mohandsen']
userKeys = ['name','age','email','address','office']
users = JSON.parse(localStorage.getItem('users')) || []
// if (users==null) users = []
addUserForm = document.querySelector('#addUser')
usersTable = document.querySelector('#usersTable')
/* show address options */
temp = ""
address.forEach(add=>{
    temp += `<option value="${add}">${add}</option>`
})
document.querySelector('select').innerHTML += temp
/* end show address options */
/*start show hide button*/
document.querySelector('#showHide').addEventListener('click', function(e){
    this.textContent == "show"? this.textContent="hide":this.textContent="show";
    document.querySelector('#formSection').classList.toggle('d-none')
})
/*end show hide button*/
/*add user*/
addUserForm.addEventListener('submit', function(e){
    e.preventDefault()
    let data = this.elements  //this = e.target = addUserForm
    let user ={
        status: false
    }
    userKeys.forEach( key => { 
        if(key!="office") user[key] = data[key].value 
        else user[key] = data[key].checked
    })
    users.push(user)
    addUserForm.reset()
    console.log(users)
    localStorage.setItem('users', JSON.stringify(users))
    singleShow(user, users.length-1)
})
/*end add user event*/
/*add new element*/
delUser = function(btn, i){
    btn.addEventListener('click',function(e){
        users.splice(i,1)
        localStorage.setItem('users', JSON.stringify(users))
        showUsers()
    })
}

editUser = function(btn, i){
    btn.addEventListener('click',function(e){
        users[i].office = !users[i].office
        localStorage.setItem('users', JSON.stringify(users))
        showUsers()
    })
}

let addElement = function(elementType, elementTxt, parent,index, eleClass=[]){
    ele = document.createElement(elementType)
    ele.textContent = elementTxt
    eleClass.forEach(c=>{ele.classList.add(c) })
    if(elementType=="button" && elementTxt=="delete") delUser(ele, index)
    if(elementType=="button" && elementTxt=="edit") editUser(ele, index)

    parent.appendChild(ele)
}
/*end add new element*/

/*show all users*/
let singleShow = function(user, i){
    tr = document.createElement('tr')
    addElement('td', i+1, tr, i)
    userKeys.forEach(key=>{ addElement('td', user[key], tr,i, []) })
    addElement('button', "delete", tr, i, ['btn', 'btn-danger', 'm-2'])
    addElement('button', "edit", tr, i, ['btn', 'btn-info','m-2'])
    usersTable.appendChild(tr)
}
let showUsers = function(){
    usersTable.innerHTML=""
    users.forEach((user, i)=>{
        singleShow(user, i)
    })
}
showUsers()
/*end show all*/



deluser = function(btn,i){
    btn.addEventListener('click',function(e){
        users.splice(i,1)
        localStorage.setItem('users', JSON.stringify(users))
        showUsers()
    })
}
