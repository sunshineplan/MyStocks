<script lang="ts">
  import { fire, post, valid } from "../misc";
  import { username, component } from "../stores";

  let password = "";
  let password1 = "";
  let password2 = "";
  let validated = false;

  const setting = async () => {
    if (valid()) {
      validated = false;
      const resp = await post("/setting", {
        password,
        password1,
        password2,
      });
      if (!resp.ok) await fire("Error", await resp.text(), "error");
      else {
        const json = await resp.json();
        if (json.status == 1) {
          await fire(
            "Success",
            "Your password has changed. Please Re-login!",
            "success"
          );
          $username = "";
          window.history.pushState({}, "", "/");
          $component = "stocks";
        } else {
          await fire("Error", json.message, "error");
          if (json.error == 1) password = "";
          else {
            password1 = "";
            password2 = "";
          }
        }
      }
    } else validated = true;
  };

  const cancel = () => {
    window.history.pushState({}, "", "/");
    $component = "stocks";
  };
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "Escape") cancel();
  }}
/>

<svelte:head>
  <title>Setting - My Stocks</title>
</svelte:head>

<header style="padding-left: 20px">
  <h3>Setting</h3>
  <hr />
</header>
<div
  style="margin-left: 120px; width: 250px"
  class="was-validated: {validated}"
  on:keyup={async (e) => {
    if (e.key == "Enter") await setting();
  }}
>
  <div class="form-group">
    <label for="password">Current Password</label>
    <input
      class="form-control"
      type="password"
      bind:value={password}
      id="password"
      maxlength="20"
      required
    />
    <div class="invalid-feedback">This field is required.</div>
  </div>
  <div class="form-group">
    <label for="password1">New Password</label>
    <input
      class="form-control"
      type="password"
      bind:value={password1}
      id="password1"
      maxlength="20"
      required
    />
    <div class="invalid-feedback">This field is required.</div>
  </div>
  <div class="form-group">
    <label for="password2">Confirm Password</label>
    <input
      class="form-control"
      type="password"
      bind:value={password2}
      id="password2"
      maxlength="20"
      required
    />
    <div class="invalid-feedback">This field is required.</div>
    <small class="form-text text-muted">
      Max password length: 20 characters.
    </small>
  </div>
  <button class="btn btn-primary" on:click={setting}>Change</button>
  <button class="btn btn-primary" on:click={cancel}>Cancel</button>
</div>

<style>
  .form-control {
    width: 250px;
  }
</style>
