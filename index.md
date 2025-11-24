---
title: list of algorithm
feature_text: |
  ## AilswanCoding
  This is a notebook for Ailswan to improving coding skills
feature_image: "https://picsum.photos/1300/400?image=989"
excerpt: "Alembic is a starting point for [Jekyll](https://jekyllrb.com/) projects. Rather than starting from scratch, this boilerplate is designed to get the ball rolling immediately. Install it, configure it, tweak it, push it."
---
<style>
  /* 外层包一层，让表格可以横向滚动（如果真的溢出） */
  .algo-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* iOS 上滚动更顺滑 */
  }

  /* 表格布局：不再强制 120% / 1200px，改为固定布局 + 100% 宽度 */
  table.algo-table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed; /* 按列宽平均分配，避免某一列过宽 */
  }

  /* 所有单元格：单行 + 紧凑 padding + 统一字体 */
  table.algo-table th,
  table.algo-table td {
    border: 1px solid lightgrey;
    padding: 2px 6px;        /* 上下 2px，左右 6px，更紧凑 */
    white-space: nowrap;     /* 单行显示 */
    font-size: 12px;
    text-align: left;
  }

  table.algo-table th {
    font-size: 13px;
    background: #fafafa;
  }

  /* 每列宽度控制：防止 Problem Name 一列占太多 */
  .algo-table th:nth-child(1),
  .algo-table td:nth-child(1) {
    width: 40px;  /* No. */
    text-align: center;
  }

  .algo-table th:nth-child(2),
  .algo-table td:nth-child(2) {
    width: 70px;  /* Level */
  }

  .algo-table th:nth-child(3),
  .algo-table td:nth-child(3) {
    width: 55%;   /* Problem Name 占主要空间 */
  }

  .algo-table th:nth-child(4),
  .algo-table td:nth-child(4) {
    width: 35%;   /* Note */
  }

  /* Problem Name cell：太长用 ... 截断，避免撑宽 */
  .problem-name-cell {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 滚动条样式（桌面浏览器） */
  .algo-table-wrapper::-webkit-scrollbar {
    height: 6px;
  }

  .algo-table-wrapper::-webkit-scrollbar-track {
    background: #f0f0f0;
  }

  .algo-table-wrapper::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 3px;
  }

  /* Tags 展开按钮样式 - 典雅版 */
  .tag-toggle-btn {
    margin-left: 6px;
    padding: 2px 8px;
    font-size: 11px;
    border-radius: 999px;              /* 胶囊圆角，更精致 */
    border: 2px solid #d6c2ff;         /* 淡淡的紫色边框 */
    background: #a89acd;               /* 柔和的浅紫底色 */
    cursor: pointer;
    line-height: 1.4;
    color: #fdfbff;
  }

  .tag-toggle-btn:hover {
    background: #ebe3ff;               /* 略深一点的浅紫 */
    border-color: #b39be5;
  }

  .tag-toggle-btn {
    border-bottom-color: #c6b5e9 !important; /* 保持淡紫色 */
  }

  /* 展开 tags 的那一行样式（基础样式） */
  .tag-row .tag-cell {
    font-size: 11px;
    background: #faf8ff;
    white-space: normal;               /* 允许多行显示完整 tags */
    border-left: 3px solid #c6b5e9;
    padding: 6px 10px;
  }

  /* tag 链接样式 */
  .tag-cell .tag-link {
    color: #5b4a86;
    text-decoration: none;
    margin-right: 6px;
  }

  .tag-cell .tag-link:hover {
    text-decoration: underline;
    color: #4a3a75;
  }

  /* 手机端再紧凑一点（可选）*/
  @media (max-width: 768px) {
    table.algo-table th,
    table.algo-table td {
      font-size: 11px;
      padding: 2px 4px;
    }
  }

  /* ✅ 强制 tag 行的字体颜色为优雅紫色，压过主题的白色 */
  body .algo-table-wrapper table.algo-table tr.tag-row td.tag-cell {
    color: #5b4a86 !important;
  }
</style>

<div class="tag-filter">
    <label>Select Tags:</label>
    <input type="checkbox" id="review"> review
</div>

<select id="sortDropdown">
    <option value="time">Sort by Time</option>
    <option value="level">Sort by Level</option>
    <option value="problemName">Sort by Problem Name</option>
</select>

<div class="algo-table-wrapper">
  <table class="algo-table">
    <thead>
      <tr>
        <th>No.</th>
        <th>Level</th>
        <th>Problem Name</th>
        <th>Note</th>
      </tr>
    </thead>
    <tbody>
      {% for post in site.posts %}
      <tr data-time="{{ post.feature_text | slice: -12, 10 | date: '%Y-%m-%d' }}"
          data-tags="{{ post.categories | join: ',' }}"
          data-status="{{ post.status }}"
          data-session="{{ post.session }}"
          data-review="{{ post.review }}">
        <td>{{ forloop.index }}</td>
        <td>
          <a href="{{ post.url }}" 
             style="{% if post.level == 'hard' %}color: #f44336;{% elsif post.level == 'medium' %}color: #f68140;{% endif %}">
             {{ post.level }}
          </a>
        </td>
        <td class="problem-name-cell">
          <a href="{{ post.url }}" style="color: #45818e">
              {{ post.title }}
          </a>
          <!-- Tags toggle 按钮 -->
          <button class="tag-toggle-btn" data-tags="{{ post.categories | join: ', ' }}">
              Tags ▼
          </button>
        </td>
        <td>{{ post.note }}</td>
      </tr>
      <!-- 展开 tags 的隐藏行 -->
      <tr class="tag-row" style="display:none;">
        <td colspan="4" class="tag-cell"></td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
</div>

<!-- JavaScript for sorting and filtering -->
<script>
// Sorting
document.getElementById('sortDropdown').addEventListener('change', function() {
    var sortingMethod = this.value;
    var tbody = document.querySelector('table tbody');
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'))
        .filter(function(row) {
            // 只对主数据行排序，忽略 tag-row
            return !row.classList.contains('tag-row');
        });

    rows.sort(function(a, b) {
        switch(sortingMethod) {
            case 'time':
                var dateA = new Date(a.getAttribute('data-time'));
                var dateB = new Date(b.getAttribute('data-time'));
                return dateB - dateA;
            case 'level':
                return a.querySelector('td:nth-child(2)').textContent
                        .localeCompare(b.querySelector('td:nth-child(2)').textContent);
            case 'problemName':
                return a.querySelector('td:nth-child(3)').textContent
                        .localeCompare(b.querySelector('td:nth-child(3)').textContent);
        }
    });

    // 重新插入行时，要连同后面的 tag-row 一起插
    rows.forEach(function(row) {
        var tagRow = row.nextElementSibling; // 紧跟的 tag-row
        tbody.appendChild(row);
        if (tagRow && tagRow.classList.contains('tag-row')) {
            tbody.appendChild(tagRow);
        }
    });
});

document.querySelectorAll('.tag-filter input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', filterTable);
});

document.getElementById('manualTagInput')?.addEventListener('input', filterTable);
document.getElementById('searchCategory')?.addEventListener('input', filterTable);
document.getElementById('session1Checkbox')?.addEventListener('change', filterTable);
document.getElementById('session2Checkbox')?.addEventListener('change', filterTable);

function normalizeString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

function filterTable() {
    var checkboxes = document.querySelectorAll('.tag-filter input[type="checkbox"]');
    var selectedTags = Array.from(checkboxes).filter(function(checkbox) {
        return checkbox.checked &&
            checkbox.id !== 'oneStarCheckbox' &&
            checkbox.id !== 'twoStarCheckbox' &&
            checkbox.id !== 'session1Checkbox' &&
            checkbox.id !== 'session2Checkbox' &&
            checkbox.id !== 'review'; // 排除 review checkbox 以避免冲突
    }).map(function(checkbox) {
        return normalizeString(checkbox.value);
    });

    var manualTag = normalizeString(document.getElementById('manualTagInput')?.value.trim() || '');
    if (manualTag) {
        selectedTags.push(manualTag);
    }

    var filterOneStar = document.getElementById('oneStarCheckbox')?.checked;
    var filterTwoStar = document.getElementById('twoStarCheckbox')?.checked;
    var filterSession1 = document.getElementById('session1Checkbox')?.checked;
    var filterSession2 = document.getElementById('session2Checkbox')?.checked;
    var filterReview = document.getElementById('review')?.checked;

    var query = normalizeString(document.getElementById('searchCategory')?.value.trim() || '');

    var rows = document.querySelectorAll('table tbody tr');
    var visibleIndex = 1;

    rows.forEach(function(row) {
        if (row.classList.contains('tag-row')) {
            // tag-row 的显隐跟随上一行的主 row，在这里先跳过
            return;
        }

        var tags = row.getAttribute('data-tags') || '';
        var status = row.getAttribute('data-status') || '';
        var session = row.getAttribute('data-session')?.trim() || '';
        var reviewCount = row.getAttribute('data-review')?.trim() || '';
        var category = normalizeString(tags); // 模糊搜索就直接用 tags

        var showRow = true;

        // 过滤 Tags
        if (selectedTags.length > 0) {
            if (tags) {
                var normalizedTags = tags.split(',').map(normalizeString);
                showRow = selectedTags.every(function(tag) {
                    return normalizedTags.includes(tag);
                });
            } else {
                showRow = false;
            }
        }

        // 过滤一星
        if (filterOneStar && status !== '★') {
            showRow = false;
        }

        // 过滤二星
        if (filterTwoStar && status !== '★★') {
            showRow = false;
        }

        // 过滤 Session1
        if (filterSession1 && session !== '1') {
            showRow = false;
        }

        // 过滤 Session2
        if (filterSession2 && session !== '2') {
            showRow = false;
        }

        // 过滤 review
        if (filterReview && (reviewCount === '' || reviewCount === '0')) {
            showRow = false;
        }

        // 模糊搜索分类（这里用 tags 内容）
        if (query && !category.includes(query)) {
            showRow = false;
        }

        row.style.display = showRow ? '' : 'none';

        // 同步控制后面的 tag-row
        var tagRow = row.nextElementSibling;
        if (tagRow && tagRow.classList.contains('tag-row')) {
            if (!showRow) {
                tagRow.style.display = 'none';
            }
        }

        if (showRow) {
            row.querySelector('td:nth-child(1)').textContent = visibleIndex++;
        }
    });
}

// =======================
// TAG 展开 / 收起逻辑（每个 tag 变成单独链接）
// =======================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tag-toggle-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var currentRow = btn.closest('tr');
            var tagRow = currentRow.nextElementSibling;  // 就是后面的 tag-row
            var tagCell = tagRow.querySelector('.tag-cell');

            // 简单 slugify：小写、去掉多余空格、空格换成 -
            function slugify(str) {
                return str
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, '-');
            }

            if (tagRow.style.display === 'none' || tagRow.style.display === '') {
                // 展开
                var rawTags = btn.dataset.tags || '';
                var tagList = rawTags.split(',')
                    .map(function(t) { return t.trim(); })
                    .filter(function(t) { return t.length > 0; });

                if (tagList.length === 0) {
                    tagCell.textContent = "Tags: None";
                } else {
                    var linksHtml = tagList.map(function(tag) {
                        var slug = slugify(tag);
                        var url = "https://ailswan.github.io/categories/#" + slug;
                        return '<a class="tag-link" href="' + url + '">' + tag + '</a>';
                    }).join(' ');

                    tagCell.innerHTML = "Tags: " + linksHtml;
                }

                tagRow.style.display = 'table-row';
                btn.textContent = "Tags ▲";
            } else {
                // 收起
                tagRow.style.display = 'none';
                btn.textContent = "Tags ▼";
            }
        });
    });
});
</script>
