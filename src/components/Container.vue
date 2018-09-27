<template>
<div class='prompt-container'>
    <slot />
</div>
</template>

<style rel='stylesheet/scss' lang='scss'>
div.prompt-container {
    position: fixed;
    top: 20%;
    left: 50%;
    width: 600px;
    margin-left: -300px;
    padding: 1.5em;
    box-shadow: 0 0 20px 2px #ccc;
    border-radius: 20px;
    background-color: #fff;
}

div.prompt-button {
    text-align: center;
}
</style>
