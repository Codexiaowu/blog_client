<template>
    <div class="profile" v-if="$store.state.userData.success">
        <div class="profile-error" v-if="error!==''">
            <customIcon type="icon-cuowu"/>
            出错了
        </div>
        <div class="profile-item">
            <div class="profile-item-name avatar-name">头像</div>
            <div class="profile-item-val">
                <a-upload name="avatar" style="margin: 0 auto" :show-upload-list="false" :action="  HTTP_Config.protocol+HTTP_Config.domain+'/api/upload-img'  " :multiple="false" @change="avatarChange">
                    <div class="avatar">
                        <img :src="$store.state.userData.avatarUrl" alt="">
                        <div class="mask">上传头像</div>
                    </div>
                </a-upload>
            </div>
        </div>
        <div class="profile-item">
            <div class="profile-item-name">昵称</div>
            <div class="profile-item-val">
                <input type="text" v-model="form.nick" maxlength="10">
            </div>
        </div>
        <div class="submit">
            <button class="primary" @click="submitUserData">保存</button>
        </div>
    </div>
    <div v-else style="text-align: center;">
        没有登录
    </div>
</template>

<script>
export default {
    data(){
        return {
            error: '',
            form: {
                nick: ''
            }
        }
    },

    mounted(){
        this.form.nick = this.$store.state.userData.nickname
    },
    computed:{
        storeUserData(){
            return this.$store.state.userData;
        }
    },
    watch:{
        storeUserData: {
            handler(){
                this.form.nick = this.$store.state.userData.nickname
            }
        }
    },
    methods:{
        avatarChange(info){
            if (info.file.status === 'done') {
                if(info.file.response.success){
                    this.$store.commit('changeAvatar',info.file.response.avatarUrl)
                }else{
                    this.error = '上传头像失败：'+(info.file.response.msg || '未知')
                }
            }
        },
        submitUserData(){
            this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/updateUser.action?data='+JSON.stringify(this.form)).then(res=>{
				if(res.data.success){
                    this.$store.commit('changeNickname',this.form.nick)
                }else{
                    this.error = '修改信息失败：'+(res.data.msg || '未知')
                }
			})
        }
    }
}
</script>

<style scoped>
    .submit {
        margin-top: 10px;
    }
    button {
		border: 0;
		outline: none;
		padding: 5px 12px;
		font-size: 15px;
		border-radius: 4px;
        background-color: #bbb;
        margin-right: 5px;
        transition: .3s;
	}
    button.primary{
        color: #eee;
        background-color: #255fca;
    }
	button.primary:hover {
		color: white;
		background-color: #2b76ee;
	}
	button:hover {
		background-color: #c5c5c5;
	}


    .profile-error {
        background-color: rgb(173, 74, 74);
        line-height: 40px;
        padding: 0 10px;
        color: white;
        border-radius: 4px 4px 0 0;
    }
    .profile-error .anticon {
        color: #e5e5e5;
    }
    .profile {
        padding-top: 20px;
    }
    .profile-item {
        display: flex;
        background-color: white;
        border-bottom: 1px solid #d5d5d5;
    }
    .profile-item-val {
        flex: 1;
    }
    .profile-item-name {
        width: 100px;
        text-align: center;
        line-height: 30px;
    }
    .profile-item-name.avatar-name {
        line-height: 150px;
    }
    .avatar {
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid rgb(167, 167, 108);
        margin: 0 auto;
        box-sizing: border-box;
    }
    .avatar .mask {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.6);
        left: 0;
        top: 0;
        color: white;
        line-height: 150px;
        text-align: center;
    }
    .avatar:hover .mask {
        display: block;
    }
    .avatar img {
        width: 150px;
        height: 150px;
        font-size: 0;
    }
    input {
        width: calc(100% - 12px);
        height: 20px;
		border: 1px solid #ddd;
		outline: none;
		padding: 4px 5px;
	}
	input:hover {
		border: 1px solid #666;
	}
	input:focus {
		border: 1px solid #35b4ee;
		margin: 0;
	}
</style>