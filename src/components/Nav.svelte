<script lang="ts">
  import { component } from "../stores";

  export let user: string;
</script>

<nav class="navbar navbar-light topbar">
  <span
    class="brand"
    on:click={() => {
      window.history.pushState({}, "", "/");
      $component = "stocks";
    }}> My Stocks </span>
  <div class="navbar-nav flex-row">
    {#if user}
      <div class="navbar-nav flex-row">
        <span class="nav-link">{user}</span>
        <span
          class="nav-link link"
          on:click={() => {
            window.history.pushState({}, "", "/setting");
            $component = "setting";
          }}> Setting </span>
        <a class="nav-link link" href="/logout">Log out</a>
      </div>
    {:else}
      <div class="navbar-nav flex-row">
        <span
          class="nav-link link"
          on:click={() => {
            window.history.pushState({}, "", "/login");
            $component = "login";
          }}> Log in </span>
      </div>
    {/if}
  </div>
</nav>

<style>
  .topbar {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 60px;
    background-color: #1a73e8;
  }

  .brand {
    padding-left: 20px;
    font-size: 25px;
    letter-spacing: 0.3px;
    color: white;
  }

  .brand:hover {
    color: white;
    text-decoration: none;
  }

  .topbar .nav-link {
    padding-left: 8px;
    padding-right: 8px;
    color: white !important;
  }

  .topbar .link:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }

  span {
    cursor: pointer;
  }
</style>
