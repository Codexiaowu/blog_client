<template>
	<div id="login-wrap">
		<h1>
            <customIcon type="icon-zhiwendenglu"/>
            用户登录
        </h1>
        <div id="error" v-if="error!==''">
            {{error}}
        </div>
		<div id="login-form">
			<div class="login-form-item" style="display: flex;">
                <customIcon type="icon-wodezhanghao"/>
                <input type="text" placeholder="输入账号" v-model="user">
			</div>
			<div class="login-form-item">
                <customIcon type="icon-mima"/>
				<input type="password" placeholder="输入密码" v-model="pass" @keypress.enter="submit">
			</div>
            <div style="text-align: right;color: blue;">
                <span style="cursor: pointer;" @click="click">忘记密码?</span>
            </div>
			<div class="login-form-item">
				<button @click="submit">登 录</button>
			</div>
            <router-link to="/register" style="color: blue;">没有账号？去注册</router-link>
		</div>
	</div>
</template>

<script>
    import { message } from 'ant-design-vue';
	export default {
        data(){
            return {
                user: '',
                pass: '',
                error: ''
            }
        },
        methods:{
            click(){
                message.info('首页下方联系管理员，暂无自助找回通道')
            },
            submit(){
                this.$axios.post(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/login.action',`user=${this.user}&pass=${this.pass}`).then(res=>{
                    if(res.data.success){
                        window.location = '/'
                    }else{
                        this.error = '登录失败：'+ (res.data.msg || '账号或密码错误');
                    }
                })
            }
        },
		beforeMount(){
			document.body.style.background = "url('"+require('../../assets/loginbg.jpg')+"')"
		},
		beforeUnmount(){
			document.body.style.background = ""
		}
	}
</script>

<style scoped>
    #error {
        width: 100%;
        background-color: rgb(185, 77, 77);
        line-height: 45px;
        border: 1px solid #ccc;
        color: #f5f5f5;
    }
	#login-wrap {
        max-width: 500px;
        margin: 0 auto;
		padding-top: 150px;
		text-align: center;
	}
	#login-form {
		margin-top: 20px;
	}
    .login-form-item .anticon{
        position: absolute;
        left: 8px;
        top: 7px;
        font-size: 16px;
    }
	input{
		width: 100%;
		border: 0;
		outline: none;
		padding: 0 10px 0 30px;
		line-height: 30px;
		border: 1px solid #ddd;
		border-radius: 3px;
		transition: .5s;
		box-sizing: border-box;
		font-size: inherit;
	}
	input:hover {
		border: 1px solid #666;
	}
	input:focus {
		border: 1px solid blueviolet;
	}
	.login-form-item {
        position: relative;
		min-width: 250px;
		margin: 10px auto;
		font-size: 14px;
	}
	button {
		width: 100%;
		outline: none;
		border: 1px solid #ddd;
		padding: 5px 15px;
		background-color: #6b28fc;
		color: #E1E1E1;
		border-radius: 4px;
		transition: .5s;
		font-size: 14px;
	}
	button:hover {
		color: white;
		background-color: #bf54fc;
	}
</style>
