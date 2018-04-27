<template>
  <b-navbar  toggleable="md" type="dark" variant="info">

 

  <b-navbar-brand  href="/">
  <b>Flanders</b></b-navbar-brand>
  <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
  <b-collapse is-nav id="nav_dropdown_collapse">

    <b-navbar-nav>
      <b-nav-item to="Neighbours">Neighbours</b-nav-item>
      <b-nav-item to="Capitals">Capitals</b-nav-item>
      <b-nav-item to="Cheat">CheatSheet</b-nav-item>
    </b-navbar-nav>

  <b-navbar-nav class="ml-auto">
      <b-img class="d-inline-block align-right"  width="75" height="75" :src="require('../static/flanders.png')" />
  </b-navbar-nav>
    
  </b-collapse>
</b-navbar>
</template>

<script>
export default {};
</script>

<style>
nav {
	margin-bottom: 20px;
}
</style>





