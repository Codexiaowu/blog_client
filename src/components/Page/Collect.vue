<template>
    <div v-if="!isLogin">
        <p style="font-size:23px;text-align: center;">没有登录</p>
    </div>
    <div class="collect" v-else>
        <div v-if="collectData.loading" style="text-align:center;padding-top:20px;">
            <Loading style="font-size:50px"/>
        </div>
        <div v-else-if="isNotData">
            <div style="font-size: 60px;text-align: center;">
                <CustomIcon type="icon-meiyoushoucang" />
            </div>
            <p style="font-size:23px;text-align: center;color: #888;">没有记录</p>
        </div>
        <div v-else-if="!isNotData" style="padding-top: 10px;">
            <div class="collect-wrap">
                <div class="collect-list-header">
                    <div style="width: 65%">标题</div>
                    <div style="width: 25%">收藏时间</div>
                    <div style="flex: 1;">操作</div>
                </div>
                <div class="collect-list-item" v-for="item,index in collectData.data" :key="item.aid">
                    <div style="width: 65%;">
                        <span style="cursor: pointer;" @click=" $router.push({name:'art',params:{id:item.aid}}) ">{{item.art_title}}</span>
                    </div>
                    <div style="width: 25%">{{item.timestamp}}</div>
                    <div class="cancleCollect" @click="cancleCollect(index)">取消收藏</div>
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
            collectData: {
                success: true,
                data:[],
                loading: true
            },
            page: 1
        }
    },
    methods:{
        getCollect(){
            this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/getMyCollect.action?page='+this.page).then(res=>{
                if(res.data.success){
                    this.collectData = res.data;
                }
            });
        },
        cancleCollect(index){
            this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/collectArticle.action?aid='+this.collectData.data[index].aid).then(res=>{
                if(res.data.success){
                    this.collectData.data.splice(index,1)
                }
            });
        }
    },
    computed:{
        isLogin(){
            return this.$store.state.userData.success === true;
        },
        isNotData(){
            return this.collectData.data.length === 0;
        },
    },
    watch:{
        isLogin:{
            handler(newVal){
                if(newVal){
                    this.getCollect();
                }
            }
        }
    },
    mounted(){
        if(this.isLogin){
            this.getCollect();
        }
    }
}
</script>

<style>
    .collect-list-header{
        display: flex;
        display: -webkit-flex;
        background-color: rgb(133, 133, 202);
        border-top: 1px solid #ddd;
    }
    .collect-list-header>div{
        color: white;
        line-height: 50px;
        padding: 0 5px;
        box-sizing: border-box;
        user-select: none;
    }
    .collect-list-item {
        display: flex;
        display: -webkit-flex;
        border-bottom: 1px solid #e5e5e5;
        background-color: white;
    }
    .collect-list-item>div{
        line-height: 35px;
        padding: 0 5px;
        box-sizing: border-box;
        color: #555;
    }
    .collect-list-item .cancleCollect{
        flex: 1;
        cursor: pointer;
        color: rgb(96, 96, 226);
    }
</style>