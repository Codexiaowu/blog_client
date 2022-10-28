<template>
	<div id="footer" style="text-align: center;">
		<div class="content-wrap" style="padding: 30px;">
			<div class="logo">
				<h2>
					<CustomIcon type="icon-boke" style="font-size: 28px; vertical-align: middle;"></CustomIcon>
					Hine博客
				</h2>
			</div>
			
			<div class="contact">
				<div class="qq">
					<CustomIcon type="icon-qq"></CustomIcon>
					<div class="qr">
						<img :src=" HTTP_Config.protocol+HTTP_Config.domain+'/imgs/qq.png'" >
					</div>
				</div>
				<div class="wx">
					<CustomIcon type="icon-weixin"></CustomIcon>
					<div class="qr">
						<img :src=" HTTP_Config.protocol+HTTP_Config.domain+'/imgs/wx.png'" >
					</div>
				</div>
			</div>
		</div>
		<div id="beian">
			<div class="content-wrap">
				<a href="http://beian.miit.gov.cn">
					赣ICP备2021002684号-1
				</a>
				<span> @Hine</span>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	#footer {
		position: absolute;
		width: 100%;
		bottom: 0;
		background-color: white;
		border-top: 1px solid #ddd;
		box-shadow: 0px 0px 4px #E1E1E1;
	}
	#beian {
		border-top: 1px solid #E1E1E1;
		line-height: 50px;
		color: #bbb;
	}
	.contact>div {
		position: relative;
		float: left;
		color: #999;
		font-size: 30px;
		margin: 0 10px;
		transition: .3s;
	}
	.contact>div:hover {
		color: #444;
	}
	.contact>div:hover .qr {
		display: block;
	}
	.contact {
		position: absolute;
		top: 28px;
		right: 0;
	}
	.contact .qr {
		display: none;
		position: absolute;
		width: 200px;
		height: 200px;
		padding: 8px;
		background-color: white;
		left: -100px;
		top: -220px;
		border: 1px solid #ddd;
		z-index: 99;
	}
	.qr img {
		width: 100%;
		height: 100%;
	}
	.logo {
		text-align: left;
	}
	.footer-content {
		padding: 30px;
	}
</style>
