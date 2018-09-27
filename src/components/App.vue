<template>
<container>
    <router-view />
</container>
</template>

<script>
import Container from './Container';

export default {
    components: {
        Container,
    },
}
</script>

<style rel='stylesheet/scss' lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Merriweather');

body {
    margin: 0;
    padding: 0;
    background-color: #efefef;
    font-family: 'Merriweather', serif;
}

a {
    text-decoration: none;
    color: inherit;
}

a:hover {
    color: grey;
}

.small-container {
    margin-bottom: 1em;

    h1, h2, h3 {
        text-align: center;
        font-weight: normal;
    }
}

.divider {
    left: 50%;
    margin: 0 auto;
    width: 80%;
    background-color: lightgrey;
    height: 2px;
}
</style>
