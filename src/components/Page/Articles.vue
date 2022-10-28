<template>
	<div id="arts">
		<div id="art-filter">
			<p style="color: #aaa;"><CustomIcon type="icon-filterguolv"></CustomIcon> 过滤</p>
			<div class="filter-item">
				<div class="filter-name">标签：</div>
				<div class="filter-value">
					<div class="add-filter-tag" style="height: 27px;margin-bottom: 5px;">
						<input type="text" placeholder="输入后回车添加搜索标签" @keypress.enter="addTags">
					</div>
					<ul class="filter-tags">
						<li title="点击移除" v-for="item,index in formFilter.tags" :key="item" @click="formFilter.tags.splice(index,1)">
							{{item}}
						</li>
						<li v-if="hasFilterTags" @click="formFilter.tags=[]">全部清除</li>
					</ul>
				</div>
			</div>
			<div class="filter-item">
				<div class="filter-name">标题：</div>
				<div class="filter-value">
                    <input type="text" placeholder="模糊搜索标题" v-model="formFilter.title">
				</div>
			</div>
            <div class="filter-item">
				<div class="filter-name">分类：</div>
				<div class="filter-value">
                    <div :class=" {select:true,selecting:typeSelect.show} " tabindex="0" @click=" artTypeSelectElClick" @blur=" artTypeSelectElBlur ">
                        <div>
                            <span :style=" formFilter.type==='请选择' ? 'color:#888':'' ">{{formFilter.type}}</span>
                            <div style="position: absolute;right:5px;top: 0px">
                                <CustomIcon type="icon-xiao-shangjiantou" v-if="typeSelect.show"/>
                                <CustomIcon type="icon-xiao-xiajiantou" v-else />
                            </div>
                        </div>
                        <div class="selectList" v-if="typeSelect.show">
                            <div :style=" formFilter.type === item.babel ? 'background-color: #ddd' : '' " class="select-item" v-for="item in typeSelect.dataSource" :key="item.key" @click.stop="typeItemClick(item)">
                                {{item.babel}}
                            </div>
                        </div>
                    </div>
				</div>
			</div>
			<div style="margin-top:8px;">
				<button class="filter-button primary" @click="getArticlesFilter">搜索</button>
                <button class="filter-button" @click="resetFilter">重置</button>
			</div>
		</div>
        <div id="articles-list" style="margin-top: 10px">
            <div class="article-item" v-for="item,index in articles.data" :key="item.id">
                <img :src="  item.preimg ? item.preimg : HTTP_Config.protocol+HTTP_Config.domain+'/imgs/preimg_null.png'  " alt="" class="pre-img" @click="jumpArticle(index)">
                <div class="article-info">
                    <h2>
                        <span class="arts-item-type" @click="jumpFilterArticles({type:item.type})">[{{item.type}}]</span>
                        <span @click="jumpArticle(index)" style="cursor: pointer;">{{item.title}}</span>
                    </h2>
                    <div class="content-pre" v-html="item.contentText"></div>
                    <div class="extra">
                        <span>
                            <CustomIcon type="icon-date"></CustomIcon>
                            {{item.timestamp}}
                        </span>
                        <span>
                            <CustomIcon type="icon-yanjing"></CustomIcon>
                            阅读 {{item.read}} 次
                        </span>
                        <span>
                            <CustomIcon type="icon-24gl-tags4"></CustomIcon>
                            <span v-for="tag in item.tags" class="tag" :key="tag" @click="jumpFilterArticles({tags:[tag]})">
                                {{tag}}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 文章列表下面的翻页器 -->
        <div style="margin-top: 5px;height: 33px;">
            <div class="pageExtra" style="float: left;">
                <p style="line-height: 33px; color: #777;font-size: 13px">共有{{articles.total}}篇文章，当前处于第{{page}}页，共有{{maxPage}}页</p>
            </div>
            <div class="pageBtns" style="float: right;">
                <button class="pageBtn" :disabled="page === 1" @click="pagePrev">上一页</button>
                <button class="pageBtn" :disabled="page === maxPage" @click="pageNext">下一页</button>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
                typeSelect: {
                    dataSource: [{babel:'请选择',key:'default'}],
                    show: false
                },
				formFilter: {
					tags: [],
					title:'',
                    type:'请选择',
				},
                submitFilter:{},
				articles:{
					total: 0,
					data: [],
				},
                page: 1
			}
		},
		methods:{
            APIgetArticles(){
                this.$router.push({query:{page: this.page,f: JSON.stringify(this.submitFilter)}})
                this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+`/api/art/getList.action?page=${this.page}&filter=${JSON.stringify(this.submitFilter)}`).then(res=>{
                    if(res.data.success){
                        this.articles = res.data;
                        this.articles.data.forEach((item)=>{
                            item.contentText = unescape(item.contentText)
                        })
                    }
                })
            },
            jumpArticle(index){
				if(index>=0 && index<=this.articles.data.length){
					this.$router.push({name:'art',params:{id:this.articles.data[index].id}})
				}
            },
			addTags(ev){
				if(ev.srcElement.value){
					this.formFilter.tags.push(ev.srcElement.value);
					ev.srcElement.value = ''
				}
			},
            typeItemClick(item){
                this.formFilter.type = item.babel;
                this.typeSelect.show = false;
            },
			getArticlesFilter(){
                this.page = 1;
                this.submitFilter = {};
                if(this.formFilter.type!=='请选择'){
                    this.submitFilter.type = this.formFilter.type;
                }
                if(this.formFilter.tags.length>0){
                    this.submitFilter.tags = [...this.formFilter.tags];
                }
                if(this.formFilter.title){
                    this.submitFilter.title = this.formFilter.title;
                }
                this.APIgetArticles()
			},
            resetFilter(){
                this.formFilter.type = "请选择";
                this.formFilter.title = "";
                this.formFilter.tags = [];
                this.submitFilter = {};
                this.page = 1;
                this.APIgetArticles()
            },
            jumpFilterArticles(json){
                this.submitFilter = json;
                this.formFilter = {...json};
                if(this.formFilter.tags === undefined || this.formFilter.tags.constructor !== Array){
                    this.formFilter.tags = [];
                }
                if(!this.formFilter.type){
                    this.formFilter.type = '请选择';
                }
                this.page = 1;
                this.APIgetArticles();
            },
            pagePrev(){
                if(this.page > 1){
                    this.page--;
                    this.APIgetArticles();
                }
            },
            pageNext(){
                if(this.page < this.maxPage){
                    this.page++;
                    this.APIgetArticles();
                }
            },
            artTypeSelectElClick(){
                this.typeSelect.show = !this.typeSelect.show
            },
            artTypeSelectElBlur(){
                this.typeSelect.show = false;
            },
		},
		computed:{
			hasFilterTags(){
				return this.formFilter.tags.length>0;
			},
            maxPage(){
                return Math.ceil(this.articles.total / 10)
            }
		},
		mounted(){
            let f = this.$router.currentRoute.value.query.f || '';
            try{
                f = JSON.parse(f);
            }catch(e){
                f = false;
            }
            if(f){
                this.submitFilter = f;

                this.formFilter = {...f};
                if(this.formFilter.tags === undefined || this.formFilter.tags.constructor !== Array){
                    this.formFilter.tags = [];
                }
                if(!this.formFilter.type){
                    this.formFilter.type='请选择';
                }
                
            }

            let page = parseInt(this.$router.currentRoute.value.query.page)
            if(page){
                this.page = page;
            }

            this.APIgetArticles()
            this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/types.action').then(res=>{
				if(res.data.success){
                    this.typeSelect.dataSource = [{babel:'请选择',key:'default'},...res.data.data]
                }
			})
		},
        beforeRouteUpdate(to){
            //点击顶部的“文章”，如果已经在文章列表页面，文章列表不会响应变化，所以要处理一下
            //另外一种方法是，把顶部的文章改成a标签，而不是用router-link
            if(Object.keys(to.query).length===0){
                this.resetFilter();
            }
            return true
        }
	}
</script>

<style scoped>
    .arts-item-type {
        font-size: 15px;
        cursor: pointer;
    }
    .arts-item-type:hover {
        text-decoration: underline;
    }
    .tag {
        display: inline-block;
        background-color: #ddd;
        padding: 0 4px;
        line-height: 19px;
        border-radius: 3px;
        margin-left: 3px;
        color: #555;
        cursor: pointer;
    }
    #articles-list {
        background-color: white;
        border-radius: 4px;
        border: 1px solid #e5e5e5;
    }
    .article-item {
        display: flex;
        padding: 7px;
        height: 164px;
        box-sizing: border-box;
        border-bottom: 1px solid #c5c5c5;
    }
    .content-pre {
        margin-top: 5px;
        height: calc(100% - 82px);
        padding: 0 8px;
        overflow: hidden;
        line-height: 24px;
        font-size: 13px;
        color: #888;
    }
    .article-item .pre-img {
        width: 200px;
        height: 150px;
        margin-right: 10px;
        border-radius: 3px;
    }
    .article-item .extra {
        font-size: 12px;
        color: #888;
        margin-top: 30px;
    }
    .article-item .extra>span {
        padding-right: 10px;
    }
    .article-info {
        flex: 1;
    }

    .select{
        position: relative;
        width: 200px;
        border: 1px solid #ddd;
        padding: 0 5px;
        background-color: white;
        font-size: 13px;
        border-radius: 3px;
        margin: 1px;
        cursor: pointer;
        height: 25px;
        box-sizing: border-box;
        line-height: 23px;
    }
    .select.selecting{
        border: 2px solid #35b4ee;
        margin: 0;
    }
    .selectList{
        position: absolute;
        width: 100%;
        left: 0;
        top: calc(100% + 3px);
        background-color: white;
        border: 1px solid #ddd;
        max-height: 280px;
        overflow-y: auto;
    }
    .select-item{
        line-height: 25px;
        padding: 0 8px;
        border-bottom: 1px solid #e5e5e5;
    }
    .select-item:hover{
        background-color: #f1f1f1;
    }

	#arts {
		padding: 20px 0;
	}
	.filter-button {
		border: 0;
		outline: none;
		padding: 5px 12px;
		font-size: 15px;
		border-radius: 4px;
        background-color: #bbb;
        margin-right: 5px;
        transition: .3s;
	}
    .filter-button.primary{
        color: #eee;
        background-color: #255fca;
    }
	.filter-button.primary:hover {
		color: white;
		background-color: #2b76ee;
	}
	.filter-button:hover {
		background-color: #c5c5c5;
	}

	.filter-item {
		display: flex;
		/* margin: 8px 0; */
		padding: 0 30px;
	}
	.filter-item input {
        width: 100%;
        max-width: 500px;
		border: 1px solid #ddd;
		outline: none;
		padding: 4px 5px;
		margin: 1px;
	}
	.filter-item input:hover {
		border: 1px solid #666;
	}
	.filter-item input:focus {
		border: 2px solid #35b4ee;
		margin: 0;
	}
	.filter-item::after {
		content: '';
		display: block;
		clear: both;
	}
	.filter-tags{
		list-style: none;
	}
	.filter-tags:after {
		content:'';
		display: block;
		clear: both;
	}
	.filter-tags>li {
		float: left;
		margin: 3px 2px;
		background-color: #aaa;
		color: white;
		border-radius: 3px;
		padding: 2px 6px;
		cursor: pointer;
		font-size: 12px;
		line-height: 14px;
	}
	.filter-name {
        width: 60px;
		font-size: 13px;
		color: #888;
        line-height: 32px;
	}
    .filter-value{
        flex: 1;
        padding-top: 3px;
    }

    .pageBtn{
        background-color: white;
    }
</style>
