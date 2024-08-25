---
title: list of algorithm
feature_text: |
  ## AilswanCoding
  This is a notebook for Ailswan to improving coding skills
feature_image: "https://picsum.photos/1300/400?image=989"
excerpt: "Alembic is a starting point for [Jekyll](https://jekyllrb.com/) projects. Rather than starting from scratch, this boilerplate is designed to get the ball rolling immediately. Install it, configure it, tweak it, push it."
---
<div class="tag-filter">
    <label for="searchCategory">Search Category:</label>
    <input type="text" id="searchCategory" placeholder="Enter category to search">
    <label>Select Tags:</label>
    <!-- <input type="checkbox" name="tags" value="AMateList">AMateList -->
    <!-- <br> -->
    <input type="checkbox" id="oneStarCheckbox"> One Star
    <!-- <label>Enter Tags:</label>
    <input type="text" id="manualTagInput" placeholder="Enter tag"> -->
</div>

<select id="sortDropdown">
    <option value="time">Sort by Time</option>
    <option value="level">Sort by Level</option>
    <option value="problemName">Sort by Problem Name</option>
    <!-- <option value="category">Sort by Category</option>
    <option value="status">Sort by Status</option> -->
</select>

<table style="border-collapse: collapse; width: 100%; padding: 18px;">
  <thead>
    <tr>
      <th style="text-align:center; border: 1px solid lightgrey; padding: 18px;">No.</th>
      <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Level</th>
      <th style="text-align:center; border: 1px solid lightgrey; padding: 18px;">Problem Name</th>
      <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Tags</th>
      <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Category</th>
      <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Status</th>
    </tr>
  </thead>
  <tbody>
    {% for post in site.posts %}
    <tr data-time="{{ post.feature_text | slice: -12, 10 | date: '%Y-%m-%d' }}" data-tags="{{ post.categories | join: ',' }}" data-status="{{ post.status }}">
        <td style="border: 1px solid lightgrey; padding: 18px;">{{ forloop.index }}</td>
        <td style="border: 1px solid lightgrey; padding: 18px;">
          <a href="{{ post.url }}" 
             style="{% if post.level == 'hard' %}color: #f44336;{% elsif post.level == 'medium' %}color: #f68140;{% endif %}">
             {{ post.level }}
          </a>
        </td>
        <td style="border: 1px solid lightgrey; padding: 18px;"><a href="{{ post.url }}"  style="color: #45818e" >{{ post.title }}</a></td>
        <td style="border: 1px solid lightgrey; padding: 18px;"><a href="{{ post.url }}" style="color: #0d94e7;">{{ post.categories | join: ", " }}</a></td>
        <td style="border: 1px solid lightgrey; padding: 18px;">{{ post.category }}</td>
        <td style="border: 1px solid lightgrey; padding: 18px;">{{ post.status }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<!-- JavaScript for sorting and filtering -->
<script>
// Sorting function remains the same
document.getElementById('sortDropdown').addEventListener('change', function() {
    var sortingMethod = this.value;
    var tbody = document.querySelector('table tbody');
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    
    rows.sort(function(a, b) {
        switch(sortingMethod) {
            case 'time':
                var dateA = new Date(a.getAttribute('data-time'));
                var dateB = new Date(b.getAttribute('data-time'));
                return dateB - dateA;
            case 'level':
                return a.querySelector('td:nth-child(2)').textContent.localeCompare(b.querySelector('td:nth-child(2)').textContent);
            case 'problemName':
                return a.querySelector('td:nth-child(3)').textContent.localeCompare(b.querySelector('td:nth-child(3)').textContent);
            case 'category':
                return a.querySelector('td:nth-child(5)').textContent.localeCompare(b.querySelector('td:nth-child(5)').textContent);
            case 'status':
                return a.querySelector('td:nth-child(6)').textContent.localeCompare(b.querySelector('td:nth-child(6)').textContent);
        }
    });

    rows.forEach(function(row) {
        tbody.appendChild(row);
    });
});

document.querySelectorAll('.tag-filter input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', filterTable);
});

// Assuming manualTagInput was commented out by mistake; uncomment if necessary
document.getElementById('manualTagInput')?.addEventListener('input', filterTable);

document.getElementById('searchCategory').addEventListener('input', filterTable);

function normalizeString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

function filterTable() {
    var checkboxes = document.querySelectorAll('.tag-filter input[type="checkbox"]');
    var selectedTags = Array.from(checkboxes).filter(function(checkbox) {
        return checkbox.checked && checkbox.id !== 'oneStarCheckbox';
    }).map(function(checkbox) {
        return normalizeString(checkbox.value);
    });

    var manualTag = normalizeString(document.getElementById('manualTagInput')?.value.trim() || '');
    if (manualTag) {
        selectedTags.push(manualTag);
    }

    var filterOneStar = document.getElementById('oneStarCheckbox').checked;
    var query = normalizeString(document.getElementById('searchCategory').value.trim());

    var rows = document.querySelectorAll('table tbody tr');
    rows.forEach(function(row) {
        var tags = row.getAttribute('data-tags');
        var status = row.getAttribute('data-status');
        var category = normalizeString(row.querySelector('td:nth-child(5)').textContent);

        var showRow = true;

        // Check if tags should filter the row
        if (tags) {
            tags = tags.split(',').map(normalizeString);
            // Ensure the row matches all selected tags
            showRow = selectedTags.every(function(tag) {
                return tags.includes(tag);
            });
        }

        // Check if "One Star" checkbox is selected and match status
        if (filterOneStar && status !== '★') {
            showRow = false;
        }

        // If there's a query, match it against the category
        if (query && !category.includes(query)) {
            showRow = false;
        }

        row.style.display = showRow ? '' : 'none';
    });
}

</script>
