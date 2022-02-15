// 加入新增&編輯DOM的方法
let bsNewproduct=null;
// 加入刪除DOM的BS方法
let bsDeleteproduct=null;



// 第一層思考，先寫出順序
// 第二層思考，精簡&合併類似的程式碼

// 新增& 編輯元件

// 哪些在根元件的資料或方法需要帶進來，哪些不用?
// props是外朝內丟資料
// emit是內朝外丟事件可夾帶資料

// 根元件
// modalOn("狀態", 物件)
// 打開視窗=>先放在根元件試試(因為是根元件的html按鈕互動)
// 在根元件中放入 第一參數(狀態)辨別開編輯還是新增 以及刪除 按鈕=> 改變外部js屬性狀態(編輯新增合併、刪除獨立)
// 清空productlist，帶入對應的物件 (第二參數)
// 利用物件方法打開子元件互動視窗

// 問題1 props傳入的資料是即時的還是show()之後才傳入的?
// 應該是即時的=>驗證後確定是即時的
// 若是即時的，則狀態部分則方在外面，使用改變屬性時做更動



// 子元件
// props進來productDisplay的物件
// 由於是props是單向數據流，所以不用展開
// 在template內部依據 外部屬性 看編輯或新增與否調整html標籤內容，並帶入資料
// 確認按鈕=>判斷編輯還是新增，對應不同的方法上傳api，畫面需再更新
// 畫面更新，使用emit帶出根元件方法getData，
// 改變外面js屬性
// 使用物件方法關閉視窗

// 刪除子元件
// 利用在根元件的對應按鈕方法，清空原本資料，並傳入物件
// 確認按鈕=> 刪除在api上的對應資料
// 畫面更新，使用emit重新帶出根元件方法getData
// 改變外面屬性
// 使用物件法關閉視窗




const app=Vue.createApp({
    data(){
        return{
            // 呈現的產品資料
            productsList:null,
            // 產品細節、編輯、新增使用data
            productDisplay:{
                imagesUrl:[],
            },
            name:"我建好了Vue元件",
            url:'https://vue3-course-api.hexschool.io/v2',
            path:'brunoyu2022',
            // 建立接收get資料庫陣列的各屬性狀態
            current_page:1,
            has_next: true,
            has_pre:false,
            total_pages:1,

            // 按鈕對應狀態
            // 是否是新增或編輯
            newOn:false,
            // 是否細節鍵被點擊
            detailDisplay:false,
            // 是否是刪除鍵被點擊
            deleteOn:false,

        
        }
    },
    methods:{
        // 渲染資料到畫面上
        getData(page=1){

            axios.get(`${this.url}/api/${this.path}/admin/products?page=${page}`)
            // 成功結果接收
            .then((res)=>{
                // 取得的結果為雙層物件，key是id value是內容
                // console.log("成功取得資料");
                console.log(res.data.products);
                // 將productlist 渲染出來，陣列型式
                this.productsList=res.data.products;
                // 將pagination各屬性帶入data屬性中
                console.log(res.data.pagination);
                this.current_page=res.data.pagination.current_page;
                this.has_next=res.data.pagination.has_next;
                this.has_pre=res.data.pagination.has_pre;
                this.total_pages=res.data.pagination.total_pages;
                // console.log (this.has_next);

              })
            //   若data取得失敗
              .catch((error)=>{
                console.dir(error);
                alert(`${error.data.message}`);
    
              })
        },

// modalOn("狀態", 物件)
// 打開視窗=>先放在根元件試試(因為是根元件的html按鈕互動)
// 在根元件中放入 第一參數(狀態)辨別開編輯還是新增 以及刪除 按鈕=> 改變外部js屬性狀態(編輯新增合併、刪除獨立)
// 清空productlist，帶入對應的物件 (第二參數)
// 利用物件方法打開子元件互動視窗

        // 新增與編輯功能，開啟modal視窗
        modalOn(status, item){
            // 判斷點按鈕狀態放在根元件
            // 編輯做法
            if(status==='edit'){
                // 帶入編輯目標的內容
                // 清空上次留下的內容
                this.productDisplay={
                    imagesUrl:[],
                };
                // 預設就是編輯，所以不改變js變數狀態
                // newOn=false;
                this.detailDisplay=false;
                this.productDisplay=item;  
                bsNewproduct.show(); 
            }else if(status==='new'){
                // 清空
                this.productDisplay={
                    imagesUrl:[],
                };
                // 新增方法狀態，改變對應的js變數
                this.newOn=true;
                this.detailDisplay=false;
                this.deleteOn=false;
                bsNewproduct.show();

            } else if(status==="delete"){
                // 清空
                this.productDisplay={
                    imagesUrl:[],
                };
                // 刪除方法狀態，改變對應的js變數
                this.productDisplay=item;
                this.newOn=false;
                this.detailDisplay=false;
                this.deleteOn=true;
                
                bsDeleteproduct.show();
            }
        },


        // 呈現細節視窗按鈕
        productDetail(item){
            // console.log(evt.target.dataset.detailId);
            this.productDisplay=item;
            this.detailDisplay=true;
            
        }
    },
    //生命週期 mounted函式
    mounted(){
        // 夾帶登入時已驗證的cookie內token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        // 確認權限
        axios.post(`${this.url}/api/user/check`)
        // 成功結果接收
        .then((res)=>{
            // console.log(res.data);
            console.log("成功登入");
        //   帶入遠端data使用方法get
        // 確認有權限後進行data接收
        this.getData();
          })
        //   若驗證token 失敗則轉回index頁面
          .catch((error)=>{
            console.dir(error);
            alert(`${error.data.message}`);
            window.location.href='index.html';
          })



    }
});

// 建立分頁元件
// 使用x-template對應script的id

app.component('pagination', {
  data(){
    return{

    }
  },
  // 設從axios response內的pagination，從其中拆出個屬性於根元件包含current_page

  // props 傳入外部的資料，可以當作內部data屬性使用
  // 為方便在TEMPLATE內表達式內加減，用小駝峰型式寫
  props:['currentPage','hasPre','hasNext', 'totalPages'],
  methods:{
    // emitData，設參數，將使用者點擊的頁數帶進來，再傳遞出去
    emitData(page){
      this.$emit('click-page', page)
    },
    

  },
  mounted(){

  },
  template:`#pagination`
})


// 建立 產品細節元件
app.component('product-detail',{
  data(){
    return{
    }
  },
  props:['productDisplay','detailDisplay'],
  template:'#productDetail',

})

// 建立產品動態視窗元件
// 新增&編輯元件
app.component('product-modal',{
  data(){
    return{
      // 新增與編輯的 MODAL title
      newTitle:'新增產品',
      editTitle:'編輯產品',
    }
  },
  props:['url','path','newOn','deleteOn','detailDisplay', 'productDisplay'],
  methods:{
    // 由於Modal的BS方法對應的id是在 product-modal裡
    // 若要在外層使用，要將DOM元素傳出
    // 因此使用BS實體化方法也使用在元件中
    // 外層CLICK按鈕後，要改變跟元件的data資料狀態，再使用PROPS傳遞狀態到內層，內層再根據狀態打開MODAL至外層
    // BS MODAL開啟方式=> bs.display，透過放在子元件賦值外部js達到bs方法公用
    // props 要傳兩個的資料進來，對應的產品按鍵狀態& productDisplay
    // 清空在確認裡，然侯再將空的productDisplay傳出=>不行，若沒有修改就沒清空了

    // newproduct=true, productDisplay



    //  新增與編輯功能 確認按鈕建立
    // 清空展示產品已做在 開啟視窗方法中
    updateData(){
              // 新增資料
              if(this.newOn){
                  // 取modal上使用者輸入的資料 v-modal串聯

                  //加入後端
                  axios.post(`${this.url}/api/${this.path}/admin/product`,{data:this.productDisplay})
                  .then((response) => {
                    alert(response.data.message);
                    bsNewproduct.hide();
                    // 需要重新觸發外層的getData()方法，再次渲染新資料
                    this.$emit('get-data');

                  }).catch((err) => {
                    alert(err.data.message);
                    bsNewproduct.hide();
                  })
  
              // 刪除的設定方法
              }else if(this.deleteOn){
                  
                  axios.delete(`${this.url}/api/${this.path}/admin/product/${this.productDisplay.id}`)
                  .then((response) => {
                    alert(response.data.message); 

                    // 需要帶入外層getData方法
                    this.$emit('get-data');
                    bsDeleteproduct.hide();
                  }).catch((err) => {
                    alert(err.data.message);
                    bsDeleteproduct.hide();
                  })
                  // 編輯方法
              }else{
                axios.put(`${this.url}/api/${this.path}/admin/product/${this.productDisplay.id}`, { data: this.productDisplay })
                .then((response) => {
                  alert(response.data.message); 
                  bsNewproduct.hide();
                  // 需要帶入外層getData方法
                  this.$emit('get-data');
                }).catch((err) => {
                  alert(err.data.message);
                  bsNewproduct.hide();
                })
              }
  
    },
  },
  
 
  template:'#modal',
  mounted(){
    // BS MODAL功能實體化
    // 針對不同目標DOM實體化
    // 新增或編輯DOM
    bsNewproduct=new bootstrap.Modal(document.querySelector('#productModal'));
    //   針對刪除DOM
    bsDeleteproduct=new bootstrap.Modal(document.querySelector('#delProductModal'));
  },
  
})


app.mount('#app');