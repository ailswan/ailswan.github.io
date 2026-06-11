---
layout: page
title: Script Vault
permalink: /scripts-vault/
aside: false
---

<style>
  .script-vault {
    --line: #d9e2e5;
    --muted: #66757a;
    --ink: #24383d;
    --accent: #256469;
  }

  .script-vault__gate,
  .script-vault__shell {
    border: 1px solid var(--line);
    padding: 18px;
    margin: 18px 0;
    background: #fff;
  }

  .script-vault__gate {
    max-width: 460px;
  }

  .script-vault__gate input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--line);
    margin: 8px 0 10px;
    font: inherit;
  }

  .script-vault__gate button {
    border: 1px solid var(--accent);
    background: var(--accent);
    color: #fff;
    padding: 8px 12px;
    cursor: pointer;
    font: inherit;
  }

  .script-vault__error {
    color: #9d2b2b;
    min-height: 1.4em;
    margin: 8px 0 0;
  }

  .script-vault__shell[hidden],
  .script-vault__gate[hidden] {
    display: none;
  }

  .script-vault__grid {
    display: grid;
    grid-template-columns: minmax(240px, 34%) 1fr;
    gap: 18px;
    align-items: start;
  }

  .script-vault__shell.is-sidebar-hidden .script-vault__grid {
    grid-template-columns: 1fr;
  }

  .script-vault__shell.is-sidebar-hidden .script-vault__list {
    display: none;
  }

  .script-vault__reader-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }

  .script-vault__toggle {
    border: 1px solid var(--line);
    background: #fff;
    color: var(--muted);
    cursor: pointer;
    font: inherit;
    font-size: 0.85rem;
    padding: 6px 9px;
    white-space: nowrap;
  }

  .script-vault__toggle:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .script-vault__list {
    border-right: 1px solid var(--line);
    padding-right: 14px;
    max-height: 75vh;
    overflow: auto;
  }

  .script-vault__search {
    width: 100%;
    padding: 9px 11px;
    border: 1px solid var(--line);
    margin: 0 0 12px;
    font: inherit;
  }

  .script-vault__folder {
    border-bottom: 1px solid var(--line);
    margin: 0;
    padding: 6px 0;
  }

  .script-vault__folder-button {
    width: 100%;
    border: 0;
    background: transparent !important;
    color: var(--ink) !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font: inherit;
    font-size: 0.95rem;
    line-height: 1.25;
    padding: 8px 0;
    text-align: left;
  }

  .script-vault__folder-button span {
    color: var(--ink);
    font-weight: 600;
  }

  .script-vault__folder-button small {
    color: var(--muted);
    font-size: 0.78rem;
  }

  .script-vault__folder-button:hover span,
  .script-vault__folder-button:hover small {
    color: var(--accent);
  }

  .script-vault__folder-button::after {
    content: "+";
    color: var(--muted);
    flex: 0 0 auto;
    font-size: 1rem;
  }

  .script-vault__folder.is-open .script-vault__folder-button::after {
    content: "-";
  }

  .script-vault__folder ul {
    list-style: none;
    padding: 0;
    margin: 2px 0 8px 12px;
  }

  .script-vault__folder:not(.is-open) ul {
    display: none;
  }

  .script-vault__folder li {
    margin: 0 0 5px;
  }

  .script-vault__file {
    display: block;
    color: var(--accent);
    text-decoration: none;
    font-size: 0.92rem;
    line-height: 1.35;
    padding: 4px 0;
  }

  .script-vault__file:hover,
  .script-vault__file.is-active {
    text-decoration: underline;
  }

  .script-vault__reader {
    min-width: 0;
  }

  .script-vault__reader-title {
    margin-top: 0;
  }

  .script-vault__reader-meta {
    color: var(--muted);
    font-size: 0.9rem;
    margin-bottom: 18px;
  }

  .script-vault__content {
    overflow-wrap: anywhere;
  }

  .script-vault__content h1,
  .script-vault__content h2,
  .script-vault__content h3 {
    margin-top: 1.2em;
  }

  .script-vault__content pre {
    overflow: auto;
    padding: 12px;
    background: #f5f7f8;
    border: 1px solid var(--line);
  }

  .script-vault__content code {
    background: #f5f7f8;
    padding: 1px 4px;
  }

  .script-vault__content blockquote {
    border-left: 4px solid var(--line);
    margin-left: 0;
    padding-left: 14px;
    color: #40555b;
  }

  @media (max-width: 820px) {
    .script-vault__grid {
      grid-template-columns: 1fr;
    }

    .script-vault__list {
      border-right: 0;
      border-bottom: 1px solid var(--line);
      padding-right: 0;
      padding-bottom: 12px;
      max-height: 42vh;
    }
  }
</style>

<div class="script-vault" id="scriptVault">
  <div class="script-vault__gate" id="scriptGate">
    <p>Private script reader.</p>
    <label for="scriptPassword">Password</label>
    <input id="scriptPassword" type="password" autocomplete="current-password">
    <button type="button" id="scriptUnlock">Open</button>
    <p class="script-vault__error" id="scriptError"></p>
  </div>

  <div class="script-vault__shell" id="scriptShell" hidden>
    <div class="script-vault__grid">
      <nav class="script-vault__list" aria-label="Script files">
        <input class="script-vault__search" id="scriptSearch" type="search" placeholder="Search scripts">
        <div id="scriptList"></div>
      </nav>
      <article class="script-vault__reader">
        <div class="script-vault__reader-actions">
          <h2 class="script-vault__reader-title" id="scriptTitle">Choose a script</h2>
          <button class="script-vault__toggle" type="button" id="scriptSidebarToggle">Hide list</button>
        </div>
        <div class="script-vault__reader-meta" id="scriptMeta"></div>
        <div class="script-vault__content" id="scriptContent">
          Select a folder and script from the list.
        </div>
      </article>
    </div>
  </div>
</div>

<script>
  (function () {
    var files = [
      {% assign script_files = site.data.script_files %}
      {% for file in script_files %}
        {
          folder: {{ file.folder | jsonify }},
          name: {{ file.name | jsonify }},
          path: {{ file.path | jsonify }},
          url: {{ file.url | jsonify }}
        }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ].filter(Boolean);

    var password = "baby";
    var gate = document.getElementById("scriptGate");
    var shell = document.getElementById("scriptShell");
    var passwordInput = document.getElementById("scriptPassword");
    var unlock = document.getElementById("scriptUnlock");
    var error = document.getElementById("scriptError");
    var list = document.getElementById("scriptList");
    var search = document.getElementById("scriptSearch");
    var title = document.getElementById("scriptTitle");
    var meta = document.getElementById("scriptMeta");
    var content = document.getElementById("scriptContent");
    var sidebarToggle = document.getElementById("scriptSidebarToggle");
    var openFolders = {};

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function inlineMarkdown(value) {
      var html = escapeHtml(value);
      html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
      html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      return html;
    }

    function renderMarkdown(markdown) {
      var lines = markdown.replace(/\r\n/g, "\n").split("\n");
      var html = [];
      var inCode = false;
      var inList = false;
      var inQuote = false;

      function closeList() {
        if (inList) {
          html.push("</ul>");
          inList = false;
        }
      }

      function closeQuote() {
        if (inQuote) {
          html.push("</blockquote>");
          inQuote = false;
        }
      }

      lines.forEach(function (line) {
        if (line.indexOf("```") === 0) {
          closeList();
          closeQuote();
          if (inCode) {
            html.push("</code></pre>");
            inCode = false;
          } else {
            html.push("<pre><code>");
            inCode = true;
          }
          return;
        }

        if (inCode) {
          html.push(escapeHtml(line) + "\n");
          return;
        }

        if (/^\s*$/.test(line)) {
          closeList();
          closeQuote();
          return;
        }

        var heading = line.match(/^(#{1,4})\s+(.*)$/);
        if (heading) {
          closeList();
          closeQuote();
          var level = Math.min(heading[1].length, 4);
          html.push("<h" + level + ">" + inlineMarkdown(heading[2]) + "</h" + level + ">");
          return;
        }

        var bullet = line.match(/^\s*[-*]\s+(.*)$/);
        if (bullet) {
          closeQuote();
          if (!inList) {
            html.push("<ul>");
            inList = true;
          }
          html.push("<li>" + inlineMarkdown(bullet[1]) + "</li>");
          return;
        }

        if (line.indexOf(">") === 0) {
          closeList();
          if (!inQuote) {
            html.push("<blockquote>");
            inQuote = true;
          }
          html.push("<p>" + inlineMarkdown(line.replace(/^>\s?/, "")) + "</p>");
          return;
        }

        closeList();
        closeQuote();
        html.push("<p>" + inlineMarkdown(line) + "</p>");
      });

      closeList();
      closeQuote();
      if (inCode) {
        html.push("</code></pre>");
      }
      return html.join("\n");
    }

    function showShell() {
      gate.hidden = true;
      shell.hidden = false;
      renderList();
    }

    function showGate() {
      gate.hidden = false;
      shell.hidden = true;
      passwordInput.focus();
    }

    function updateSidebarToggle() {
      var hidden = shell.classList.contains("is-sidebar-hidden");
      sidebarToggle.textContent = hidden ? "Show list" : "Hide list";
    }

    function groupFiles(items) {
      return items.reduce(function (groups, file) {
        groups[file.folder] = groups[file.folder] || [];
        groups[file.folder].push(file);
        return groups;
      }, {});
    }

    function normalizeSearch(value) {
      return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    }

    function fuzzyMatch(text, query) {
      var target = normalizeSearch(text);
      var needle = normalizeSearch(query);
      var index = 0;

      if (!needle) {
        return true;
      }

      for (var i = 0; i < target.length && index < needle.length; i += 1) {
        if (target[i] === needle[index]) {
          index += 1;
        }
      }

      return index === needle.length;
    }

    function naturalCompare(left, right) {
      return left.path.localeCompare(right.path, undefined, {
        numeric: true,
        sensitivity: "base"
      });
    }

    function renderList() {
      var query = search.value || "";
      var filtered = files.filter(function (file) {
        return fuzzyMatch(file.name, query) || fuzzyMatch(file.path, query);
      });
      var groups = groupFiles(filtered);
      var folders = Object.keys(groups).sort();

      list.innerHTML = folders.map(function (folder) {
        var isOpen = query || openFolders[folder];
        var items = groups[folder].sort(naturalCompare).map(function (file) {
          return '<li><a href="#" class="script-vault__file" data-url="' +
            escapeHtml(file.url) + '" data-path="' + escapeHtml(file.path) +
            '" data-name="' + escapeHtml(file.name) + '">' +
            escapeHtml(file.name) + "</a></li>";
        }).join("");
        return '<section class="script-vault__folder' + (isOpen ? " is-open" : "") +
          '" data-folder="' + escapeHtml(folder) + '">' +
          '<button type="button" class="script-vault__folder-button">' +
          '<span>' + escapeHtml(folder) + '</span><small>' + groups[folder].length +
          "</small></button><ul>" + items + "</ul></section>";
      }).join("");

      if (!filtered.length) {
        list.innerHTML = "<p>No scripts found.</p>";
      }
    }

    function loadScript(link) {
      var url = link.getAttribute("data-url");
      var path = link.getAttribute("data-path");
      var name = link.getAttribute("data-name");

      Array.prototype.forEach.call(document.querySelectorAll(".script-vault__file"), function (item) {
        item.classList.remove("is-active");
      });
      link.classList.add("is-active");

      title.textContent = name;
      meta.textContent = path;
      content.innerHTML = "<p>Loading...</p>";

      fetch(encodeURI(url), { cache: "no-store" })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Unable to load script.");
          }
          return response.text();
        })
        .then(function (markdown) {
          content.innerHTML = renderMarkdown(markdown);
        })
        .catch(function (err) {
          content.innerHTML = "<p>" + escapeHtml(err.message) + "</p>";
        });
    }

    unlock.addEventListener("click", function () {
      if (passwordInput.value === password) {
        error.textContent = "";
        showShell();
      } else {
        error.textContent = "Wrong password.";
        passwordInput.value = "";
        passwordInput.focus();
      }
    });

    passwordInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        unlock.click();
      }
    });

    list.addEventListener("click", function (event) {
      var folderButton = event.target.closest(".script-vault__folder-button");
      if (folderButton) {
        var folder = folderButton.closest(".script-vault__folder");
        var folderName = folder.getAttribute("data-folder");
        openFolders[folderName] = !folder.classList.contains("is-open");
        renderList();
        return;
      }

      var link = event.target.closest(".script-vault__file");
      if (!link) {
        return;
      }
      event.preventDefault();
      loadScript(link);
    });

    search.addEventListener("input", function () {
      renderList();
    });

    sidebarToggle.addEventListener("click", function () {
      shell.classList.toggle("is-sidebar-hidden");
      updateSidebarToggle();
    });

    showGate();
    updateSidebarToggle();
  })();
</script>
