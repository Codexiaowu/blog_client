<template>
	<div id="login-wrap">
		<h1>
            <customIcon type="icon-zhuce"/>
            用户注册
        </h1>
        <div id="error" v-if="error!==''">
            {{error}}
        </div>
		<div id="login-form">
            <div class="login-form-item">
                <customIcon type="icon-youxiang"/>
				<input type="text" placeholder="输入邮箱" v-model="form.email">
			</div>
			<div class="login-form-item">
                <customIcon type="icon-wodezhanghao"/>
                <input type="text" placeholder="输入账号" v-model="form.user">
			</div>
			<div class="login-form-item">
                <customIcon type="icon-mima"/>
				<input type="password" placeholder="输入密码" v-model="form.pass" @keypress.enter="submit">
			</div>
			<div class="login-form-item">
				<button @click="submit">注 册</button>
			</div>
            <router-link to="/login" style="color: blue;">已有账号？去登录</router-link>
		</div>
	</div>
</template>

<script>
	export default {
        data(){
            return {
                form: {
                    email: '',
                    user: '',
                    pass: ''
                },
                error: ''
            }
        },
        methods:{
            submit(){
                if(this.form.email === '' || this.form.email.includes('@') === false){
                    this.error = '邮箱没有正确填写'
                    return false;
                }
                if(this.form.user === '' || this.form.user.length<2){
                    this.error = '用户名没有正确填写'
                    return false;
                }
                if(this.form.pass === '' || this.form.pass.length<6){
                    this.error = '密码没有正确填写'
                    return false;
                }
                this.error='';

                this.$axios.post(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/register.action',`email=${this.form.email}&user=${this.form.user}&pass=${this.form.pass}`).then(res=>{
                    if(res.data.success){
                        window.location = '/'
                    }else{
                        this.error = '注册失败：'+res.data.msg;
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
        width: 500px;
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
		/* width: 20%; */
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
