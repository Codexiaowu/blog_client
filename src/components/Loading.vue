<template>
    <CustomIcon type="icon-jiazaizhong" class="loading"/>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .loading{
        animation:circle 2.5s infinite linear;
    }
    @-webkit-keyframes circle{
        0%{ transform:rotate(0deg); }
        100%{ transform:rotate(360deg); }
    }
    @-o-keyframes circle{
        0%{ transform:rotate(0deg); }
        100%{ transform:rotate(360deg); }
    }
    @-moz-keyframes circle{
        0%{ transform:rotate(0deg); }
        100%{ transform:rotate(360deg); }
    }
    @keyframes circle{
        0%{ transform:rotate(0deg); }
        100%{ transform:rotate(360deg); }
    }
</style>