//element secimi
const taskInput = document.querySelector("#task");//gorev girisi
const list = document.querySelector("#list");//liste
const liveToastBtn = document.querySelector("#liveToastBtn");//ekle butonu

//sayfa yuklenmesinde calisacak
document.addEventListener("DOMContentLoaded", loadItems);

//yeni gorev ekleme
function newElement(){
  const inputValue=taskInput.value.trim(); // Boşlukları temizle

  //hata mesajji
  if (inputValue=== "") {
    $(".toast.error").toast("show");
    return;
  }

  //liste olusturma
  const li=document.createElement("li");
  li.textContent=inputValue;

  //listeye ekleme
  list.appendChild(li);

  //silme
  addCloseButton(li);

  //tiklandiginda gorev yapildi olarak isaretlenecek
  li.addEventListener("click",function(){
    this.classList.toggle("checked");
    saveLocal();
  });

  //kayit
  saveLocal();

  //listeye eklendi mesaji
  $(".toast.success").toast("show");

  //eklendikten sonra girdi kisminin temizlenmesi
  taskInput.value="";
}

//silme butonu
function addCloseButton(liItem){
  const span=document.createElement("span");
  span.textContent="\u00D7"; //carpi isareti
  span.className="close";
  
  //carpiya basinca olacaklar:
  span.onclick=function (){
    const parentLi = this.parentElement; //listeyi bul
    parentLi.remove(); //listeyi sil
    saveLocal();//guncel hali kaydet
  };
  liItem.appendChild(span);
}

//sayfa yenilenince verileri tutma
function saveLocal(){
  const todos=[];
  //listenin kontrolu
  list.querySelectorAll("li").forEach((li)=>{
    todos.push({
      text:li.childNodes[0].textContent,
      isChecked:li.classList.contains("checked") //yapılma kontrolu
    });
  });
  //tarayıcıya yazma
  localStorage.setItem("todos", JSON.stringify(todos));
}

//yuklenmis liste elemanlarna istenen ozellikleri ekleme
function loadItems(){
  list.querySelectorAll("li").forEach((li) => {
    addCloseButton(li);//silme
    li.addEventListener("click", function () {
      this.classList.toggle("checked");//yapildi olarak isaretleme
      saveLocal();//kayit
    });
  });

  //eski veriler getirme
  const todos=JSON.parse(localStorage.getItem("todos"));
  
  //eski verilerin kontrolu
  if(todos){
    list.innerHTML=""; 
    
    todos.forEach((todo) => {
      const li = document.createElement("li");//yeni liste maddesi
      li.textContent=todo.text;//maddeye yaziyi koyma

      //gorev durumu kontrolu
      if(todo.isChecked) {
        li.classList.add("checked");
      }
      
      list.appendChild(li);
      addCloseButton(li);//carpi isareti
      
      //maddenin yapilip yapilmadiginin kontrolu
      li.addEventListener("click", function () {
        this.classList.toggle("checked");
        saveLocal();
      });
    });
  }
}