<template>
	<TopNav></TopNav>
	<div class="content-wrap">
		<router-view></router-view>
	</div>
	<Footer></Footer>
</template>

<script>
	import TopNav from './TopNav.vue';
	import Footer from './Footer.vue';

    

	export default {
		components: {
			TopNav,
			Footer
		},
        created(){
            this.$axios.get(this.HTTP_Config.protocol+this.HTTP_Config.domain+'/api/this.action').then(res=>{
                if(res.data.success){
                    this.$store.commit('changeUserData',res.data)
                }
            })
        }
	}
</script>

<style>
</style>
