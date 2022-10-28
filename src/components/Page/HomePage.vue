<template>
	<!-- 最新文章 -->
	<div id="news-art">
		<h3 style="display: inline-block;">
			<CustomIcon type="icon-zuixin1"></CustomIcon>
			最新文章
		</h3>
		<div id="arts-list">
			<div class="art-item" v-for="item,index in newArts" :key="item.id">
				<div class="art-img-wrap" @click="jumpArt(index)">
					<img :src=" item.preimg ? item.preimg : HTTP_Config.protocol+HTTP_Config.domain+'/imgs/preimg_null.png'" alt="">
				</div>
				<div class="tags">
					<span v-for="tag in item.tags" :key="tag" @click=" jumpFilterArticles({tags:[tag]}) ">
						{{tag}}
					</span>
				</div>
				<h3 class="art-title" :title="item.title">
                    <span class="art-type" @click=" jumpFilterArticles({type:item.type}) ">[{{item.type}}]</span>
                    <span @click="jumpArt(index)">{{item.title}}</span>
                </h3>
				<div class="art-extra">
					<span>
						<CustomIcon type="icon-date"></CustomIcon>
						{{item.timestamp}}
					</span>
					<span class="read">
						<CustomIcon type="icon-yanjing"></CustomIcon>
						{{item.read}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data(){
			return {
				newArts: []
			}
		},
		methods:{
			jumpArt(index){
				if(index>=0 && index<=this.newArts.length){
					this.$router.push({name:'art',params:{id:this.newArts[index].id}})
				}
			},
            jumpFilterArticles(json){
                this.$router.push({name:'arts',query:{f:JSON.stringify(json)}})
            }
		},
		mounted(){
			this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/getNews.action').then(res=>{
				this.newArts = res.data.data;
			});
		}
	}
</script>

<style>
    .art-type {
        font-size: 12px;
        font-weight: normal;
    }
    .art-type:hover {
        text-decoration: underline;
    }
	@media screen and (max-width: 1500px) {
		.art-item img {
			height: 200px !important;
		}
	}
	@media screen and (max-width: 1250px) {
		.art-item img {
			height: 170px !important;
		}
		.art-title {
			font-size: 13px !important;
		}
	}
	#news-art {
		padding: 20px 0;
	}
	#arts-list {
		display: flex;
		flex-wrap: wrap;
	}
	.art-item {
		display: block;
		width: calc(33.3% - 20px);
		min-height: 150px;
		margin: 10px;
		background-color: white;
		border-radius: 5px;
		border: 1px solid #ddd;
		box-sizing: border-box;
		box-shadow: 0 0 5px #e5e5e5;
		transition: .5s;
	}
	.tags {
		padding: 0 5px;
	}
	.tags span {
		padding-right: 10px;
		font-size: 12px;
	}
	.tags span:before {
		content:'';
		display: inline-block;
		background-color: #ff5500;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		margin-right: 3px;
		margin-bottom: 2px;
	}
	.art-title {
        min-height: 36px;
		margin: 5px 5px 20px;
		font-size: 14px;
		transition: .5s;
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
		cursor: pointer;
	}
	.art-item:hover {
		box-shadow: 0 12px 10px #d1d1d1;
		transform: translateY(-10px);
	}
	.art-item:hover img {
		transform: scale(1.2);
	}
	.art-img-wrap{
		width: calc(100% - 10px);
		margin: 5px auto;
		overflow: hidden;
		border-radius: 5px 5px 0 0;
		font-size: 0;
		cursor: pointer;
	}
	.art-item img {
		width: 100%;
		height: 230px;
		transition: .8s;
	}
	.art-extra {
		color: #777;
		margin: 5px 0;
		font-size: 12px;
		border-top: 1px solid #ddd;
		padding: 5px 10px;
	}
	.art-extra .read {
		padding: 0 5px;
	}
</style>