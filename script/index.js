// 這部分先以純js寫入
// 抓取登入鈕，監聽，並帶入login事件
// login函式內需建立 axios post功能，將使用者資訊丟出進行資料庫比對
// 抓取使用者資訊，包裝成api的要求格式
// login函式中需進行轉址動作
// 需先抓取dom元素使用者提供的資訊內容
// axios對象api的格式，第一參數需放url，第二需放，帶有該需求的物件內容
// 在axios中then中帶入1.將回傳res物件中的token以及expired存入cookie 2.進行轉址動作，
// 回傳catch資訊讓使用者知道輸入錯誤的提示




// // 加入api站點、路徑
// const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
// const path = 'brunoyu2022'; // 請加入個人 API Path

// // 登入按鈕DOM元素
// const loginBtn=document.querySelector('button[data-name="loginBtn"]');
// // EMAIL 輸入欄DOM元素
// const InputEmail = document.querySelector('#username')
// // PASSWORD輸入欄DOM元素
// const InputPassword = document.querySelector('#password')
// // 注意監聽的第二個函式只能寫名字不能加()否則會直接執行
// loginBtn.addEventListener('click', login);
// function login(){
//     console.log('有點到按鈕');
//     // 抓取使用者輸入資訊
//     const username=InputEmail.value;
//     const password=InputPassword.value;
//     const user={username, password};
//     console.log(user);
//     // 使用axios與傳送api確認授權
//     axios.post(`${url}/admin/signin`, user)
//     .then((res)=>{ //成功登入設置
//         console.log("登入成功");
//         //存入cookie
//         const {token, expired }=res.data;//分解宣告
//         console.log(token, expired);
//         document.cookie = `hextoken=${token}; expires=${expired};`;
//         alert('登入成功，按確定後進行跳轉');
//         // 轉址
//         window.location.href='products.html';
//     })
//     .catch((error)=>{
//         alert(`警告: ${error.data.message} \n提醒: ${error.data.error.message}`)
//     })


// };


// vue元件寫法

const app=Vue.createApp({
    // 資料集 data
    data(){
        return {
            url:"https://vue3-course-api.hexschool.io/v2" ,
            path:"brunoyu2022",

        };
    },
    // 方法集 methods
    methods:{
        // 登入鈕
        login(){
            console.log('有點到按鈕');
            // 抓取使用者輸入資訊
            // 登入按鈕DOM元素
            const loginBtn=document.querySelector('button[data-name="loginBtn"]');
            // EMAIL 輸入欄DOM元素
            const InputEmail = document.querySelector('#username')
            // PASSWORD輸入欄DOM元素
            const InputPassword = document.querySelector('#password')
            const username=InputEmail.value;
            const password=InputPassword.value;
            const user={username, password};
            console.log(user);
            // 使用axios與傳送api確認授權
            axios.post(`${this.url}/admin/signin`, user)
            .then((res)=>{ //成功登入設置
                console.log("登入成功");
                //存入cookie
                const {token, expired }=res.data;//分解宣告
                console.log(token, expired);
                document.cookie = `hextoken=${token}; expires=${expired};`;
                alert('登入成功，按確定後進行跳轉');
                // 轉址
                window.location.href='productsWeek4.html';
            })
            .catch((error)=>{
                alert(`警告: ${error.data.message} \n提醒: ${error.data.error.message}`)
            })
    }
    },
    mounted(){

    }
});
app.mount('#app');