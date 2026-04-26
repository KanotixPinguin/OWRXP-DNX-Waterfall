Plugins.dnx_matrix = {
  init: function () {
    function ensureThemeOption() {
      var list = document.getElementById("openwebrx-themes-listbox");
      if (!list) return false;

      if (!list.querySelector('option[value="dnx-matrix"]')) {
        var opt = document.createElement("option");
        opt.value = "dnx-matrix";
        opt.textContent = "DNX Matrix";
        list.appendChild(opt);
      }
      return true;
    }

    function boot() {
      if (ensureThemeOption()) return;

      var tries = 0;
      var timer = setInterval(function () {
        tries++;
        if (ensureThemeOption() || tries > 40) clearInterval(timer);
      }, 250);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
      boot();
    }
  }
};
