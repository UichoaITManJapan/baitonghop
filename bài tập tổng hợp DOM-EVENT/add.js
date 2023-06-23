// bố cục bài làm:
//CRUD --> Hiển thị ---> tạo mới ---> update ----> delete

// biến toàn cục chứa mảng 2 chiều chứa tất cả học viên 
listStudent = [
    ['SV001',"Trần Tiến Cường","abc@gmail.com","Hải Dương","090-234-56798","male"]
];
//tạo 1 biến action mặc định là thêm mới
let action = "create";
// Hàm render dữ liêụ từ listStudent ra table
function renderData(){
    // lấy ra phần tử đc render dữ liệu
    let tbody = document.getElementById("content");
    // đặt tbody trống
    tbody.innerHTML = "";
    for ( let index= 0; index< listStudent.length; index++){
        // render dữ liệu từng tr của tbody
        tbody.innerHTML += ` <tr>
        <td>${index +1}</td>
        <td>${listStudent[index][0]}</td>
        <td>${listStudent[index][1]}</td>
        <td>${listStudent[index][2]}</td>
        <td>${listStudent[index][3]}</td>
        <td>${listStudent[index][4]}</td>
        <td>${listStudent[index][5]}</td>
        <td>
        <button onclick = "editStudent('${listStudent[index][0]}')">Edit</button>
        <button onclick =  "deleteStudent('${listStudent[index][0]}')">Delete</button>
        </td>
    </tr>
        `
    }
}
// hàm validate dữ liệu: dữ liệu khách hàng nhập vào khi thêm mới hoăc cập nhật
function validateForm(){
    //. lấy dữ liệu từ form
    let studentId = document.getElementById("studentId").value;
    let studentName = document.getElementById("studentName").value;
    let email = document.getElementById("email").value;
    let place = document.getElementById("place").value;
    let phone = document.getElementById("phone").value;
    let sex = document.querySelector("input[name='sex']:checked").value;
    //2 thực hiện validate , nếu thoả mãn --> true, có lỗi thoong báo --> false
    //validate StudentId
    if(studentId == ""){
        alert("Vui lòng nhập mã sinh viên");
        return false;
    }
    // validate StudentID bị trùng
    let index = document.getElementById("studentId");
    if(index>=0){
        alert("Mã sinh viên đã tồn tạ, vui lòng nhập lại");
        return false;
    }
    // validate StudentName
    if(studentName == ""){
        alert("Vui lòng điền tên sinh viên");
        return false;
    }
    //validate email
    let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.match(emailValidate)){
        alert("Vui lòng nhập email đúng định dạng");
        return false;
    }
    //validate place
    if(place == ""){
        alert("Vui lòng nhập địa chỉ");
        return false;
    }
    //validate phone
    let phoneValidate =  /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
    if(!phone.match(phoneValidate)){
        alert("Vui lòng nhập phone đúng định dạng");
        return false;
    }
    return true;
}

//hàm thực hiện thêm mới hoặc cập nhật sinh viên
function createOrEdit(){
    if(validateForm()){ 
         //1.  lấy dữ liệu từ form
         let studentId = document.getElementById("studentId").value;
         let studentName = document.getElementById("studentName").value;
         let email = document.getElementById("email").value;
         let place = document.getElementById("place").value;
         let phone = document.getElementById("phone").value;
         let sex = document.querySelector("input[name='sex']:checked").value;
        if(action = "create"){
        //thực hiện thêm mới sinh viên
        //2.push sinh viên vào mảng 2 chiều
        listStudent.push([studentId,studentName,email,place,phone,sex]);
        } else {
        //thực hiện cập nhật sinh viên
        //2. lấy chỉ số sinh viên trong mảng
        let index = getStudentByStudentId(studentId);
        //3. tiến hanhf cập nhật
        listStudent[index][1] = studentName;
        listStudent[index][2] = email;
        listStudent[index][3] = place;
        listStudent[index][4] = phone;
        listStudent[index][5] = sex;
        // cho phép nhập lại studentId
        document.getElementById("studentId").readonly = false;
        } 
        //xoá dưc liệu trên form khi thêm mới hoặc cập nhât
        document.getElementById("studentId").value ="";
        document.getElementById("studentName").value ="";
        document.getElementById("email").value ="";
        document.getElementById("place").value ="";
        document.getElementById("phone").value ="";
        document.getElementById("male").checked = true;
        //render lại dữ liệu
        renderData();
    }
}
//hàm lấy chỉ số  sinh viên trong listStudent từ studentId
function getStudentByStudentId(studentId){
    for ( let index=0; index < listStudent.length;index++){
        if(studentId == listStudent[index][0]){
            return index;
        }
    }
    return -1;
}


//hàm thực hiện lấy studentId từ table, lấy dữ liệu từ listStudent và fill lên form
function editStudent(studentId){
    //1. lấy chỉ số sinh viên trong mảng
    let index = getStudentByStudentId(studentId);
    if(index >=0){
       // 2. fill thông tin ra form
        document.getElementById("studentId").value = listStudent[index][0];
        document.getElementById("studentName").value = listStudent[index][1];
        document.getElementById("email").value = listStudent[index][2];
        document.getElementById("place").value = listStudent[index][3];
        document.getElementById("phone").value = listStudent[index][4];
           if( listStudent[index][5] == "Male"){
               document.getElementById("male").checked = true;
           } else {
               document.getElementById("female").checked = true;
           }
        // đổi action = edit
        action = "edit"; 
        // để studentId thành readOnly
        document.getElementById("studentId").readonly = true;
    }
}
//hàm thực hiênj xoá sinh viên
function deleteStudent(studentId){
    //1. lấy index sinh viên trong mảng
    let index = getStudentByStudentId(studentId);
    //2. thực hiện xoá theo index
    listStudent.splice(index,1);
    //3. render lại dũe liệu
    renderData();

}


//khi trình duyệt load thì sẽ load dữ liệu student và hiển thị nó lên table
document.onload = renderData();

// Truy cập vào phần tử Save và gắn sư kiện click
let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click",function(event){
//chặn sự kiến submit default cảu form
event.preventDefault();
createOrEdit();
});