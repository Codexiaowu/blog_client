<template>
	<div id="top-nav">
		<div id="wrap">
			<div id="logo" style="float: left;">
				<router-link to="/">
					<h2 style="line-height: 55px;margin: 0; display: inline-block;">
						<CustomIcon type="icon-boke" style="font-size: 28px; vertical-align: middle;"></CustomIcon>
						Hine
					</h2>
				</router-link>
			</div>
			<div id="nav" style="float: left;">
				<ul id="nav-ul">
					<li>
						<router-link to="/">首页</router-link>
					</li>
					<li>
						<router-link to="/page/arts">文章</router-link>
					</li>
				</ul>
			</div>
			<div class="user">
				<div v-if="$store.state.userData.success" class="user-wrap">
                    <div class="notice">
                        <div class="dot" v-if="notice.dot"></div>
                        <CustomIcon type="icon-tixing" style="font-size: 20px;margin: 0 10px;vertical-align: middle;"/>
                        <div class="notice-wrap">
                            <div v-if="this.notice.loading" style="text-align:center;">
                                <Loading style="font-size:30px"/>
                            </div>
                            <div v-else-if="notice.data.length===0" style="text-align: center;">
                                无通知
                            </div>
                            <div v-else v-for="item1,index in notice.data" :key="item1.id" @click=" clickNotice(item1.linkUrl,item1.id,index) " :style=" item1.read === 0 ? 'font-weight:bold;': 'color: #888;' ">
                                {{item1.fromUsername}}{{item1.content}}
                            </div>
                        </div>
                    </div>
					<div id="userinfo">
                        <img :src="$store.state.userData.avatarUrl" alt="">
                        <CustomIcon type="icon-xiajiantou" style="padding-left: 3px;font-size:12px; color: #717171;"/>
                        <div class="user-menu">
                            <div class="user-menu-wrap">
                                <div class="user-menu-item" @click=" $router.push({name:'profile'}) ">
                                    <CustomIcon type="icon-profile_light" style="font-size:15px; color: #717171;vertical-align: middle;"/>
                                    个人信息
                                </div>
                                <div class="user-menu-item" @click=" $router.push({name:'collect'}) ">
                                    <CustomIcon type="icon-jushoucang" style="font-size:15px; color: #717171;vertical-align: middle;"/>
                                    我的收藏
                                </div>
                                <div class="user-menu-item" @click="click">
                                    <CustomIcon type="icon-iconfontguanji" style="font-size:15px; color: #717171;vertical-align: middle;"/>
                                    退出登录
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
				<div v-else>
					<button class="login-port" @click="$router.push('/login')">
						<CustomIcon type="icon-yonghu"></CustomIcon>
						登录
					</button>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import Loading from '../Loading.vue'
export default {
    components:{Loading},
    data(){
        return {
            notice: {
                dot: false,
                data:[],
                loading: true
            }
        }
    },
    computed:{
        storeUserData(){
            return this.$store.state.userData;
        }
    },
    watch:{
        storeUserData:{
            handler(newVal){
                if(newVal.success){
                    this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/getNotice.action').then(res=>{
                        this.notice = res.data;
                    });
                }
            }
        }
    },
    methods:{
        click(){
            this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/logout.action').then(()=>{
				this.$store.commit('changeUserData',{})
			});
        },
        clickNotice(url,id,index){
            this.$router.push(url,id);
            this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/readNotice.action?id='+id).then(res=>{
                if(res.data.success){
                    this.notice.data[index].read = 1;
                }
            });
        }
    }
}
</script>

<style scoped>
    .dot{
        position: absolute;
        right: 11px;
        top: 16px;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 50%;
        border: 1px solid #aaa;
    }
    .notice {
        position: relative;
    }
    .notice-wrap {
        display: none;
        position: absolute;
        width: 200px;
        border: 1px solid #d5d5d5;
        top: 101%;
        right: 0;
        background-color: white;
        box-sizing: border-box;
        max-height: 300px;
        overflow-y: auto;
    }
    .notice-wrap>div{
        padding: 3px 7px;
        line-height: 35px;
        font-size: 13px;
        color: rgb(88, 88, 190);
        cursor: pointer;
    }
    .notice-wrap>div:not(:last-of-type){
        border-bottom: 1px solid #e5e5e5;
    }
    .notice-wrap>div:hover{
        text-decoration: underline;
    }
    .notice:hover .notice-wrap{
        display: block;
    }

	@media screen and (max-width: 750px) {
		#wrap {
			width: 100% !important;
		}
	}

    #userinfo{
        position: relative;
    }
    #userinfo:hover .user-menu{
        display: block;
    }
    .user-menu {
        display: none;
        position: absolute;
        width: 100%;
        top: 101%;
        left: -100%;
    }
    .user-menu-wrap {
        width: 110px;
        background-color: white;
        border: 1px solid #d5d5d5;
    }
    .user-menu-item {
        line-height: 35px;
        padding: 0 8px;
        cursor: pointer;
        border-bottom: 1px solid #f1f1f1;
        font-size: 13px;
    }
    .user-menu-inNick {
        line-height: 45px;
        padding: 0 8px;
        border-bottom: 1px solid #f1f1f1;
        font-size: 15px;
    }
    .user-menu-item:hover {
        background-color: #e5e5e5;
    }
    #userinfo img{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 2px solid rgb(139, 139, 100);
        box-sizing: border-box;
        vertical-align: middle;
        margin-right: 5px;
        box-shadow: 0 3px 4px rgb(201, 201, 168);
    }
    #userinfo img:hover{
        border: 2px solid rgb(228, 228, 129);
    }



	#top-nav {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 55px;
		border-bottom: 1px solid #ddd;
		box-shadow: 0 0 5px #d5d5d5;
		background-color: white;
		z-index: 82406064;
	}
	#wrap {
		position: relative;
		width: 70%;
		margin: 0 auto;
		max-width: 1200px;
	}
	#wrap:after {
		content: '';
		display: block;
		clear: both;
	}
    .user-wrap{
        display: flex;
        display: -webkit-flex;
    }
	.user {
		position: absolute;
		top: 0;
		right: 10px;
		line-height: 55px;
	}
	.login-port {
		outline: none;
		border: 1px solid #c1c1c1;
		background-color: #f1f1f1;
		border-radius: 3px;
		padding: 3px 6px;
		color: inherit;
	}
	.login-port:hover {
		border: 1px solid #888;
	}
	
	#nav-ul {
		list-style: none;
		user-select: none;
		margin-left: 50px;
	}
	#nav-ul::after {
		content: '';
		display: block;
		clear: both;
	}
	#nav-ul li {
		float: left;
		line-height: 55px;
		margin: 0 10px;
		font-size: 16px;
		box-sizing: border-box;
	}
	#nav-ul li:hover {
		border-bottom: 1px solid blue;
	}
</style>
