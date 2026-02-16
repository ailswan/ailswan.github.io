---
layout: page
title: Ad-hoc
permalink: /ad-hoc/
feature_text: |
  ## Ad-hoc
  This is a notebook for quick Q&A
feature_image: "https://picsum.photos/1300/400?image=909"
excerpt: "Alembic is a starting point for [Jekyll](https://jekyllrb.com/) projects. Rather than starting from scratch, this boilerplate is designed to get the ball rolling immediately. Install it, configure it, tweak it, push it."
---
<div class="tag-filter">
    <!-- <label for="searchCategory">Search Category:</label> -->
    <!-- <input type="text" id="searchCategory" placeholder="Enter category to search"> -->
    <label>Select Tags:</label>
    <input type="checkbox" id="oneStarCheckbox"> review
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
      <!-- <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Level</th> -->
      <th style="text-align:center; border: 1px solid lightgrey; padding: 18px;">Question</th>
      <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Tags</th>
      <!-- <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Category</th>
      <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Status</th> -->
      <!-- <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Session</th> -->
    </tr>
  </thead>
  <tbody>
    {% for post in site.poststwo %}
    <tr data-time="{{ post.feature_text | slice: -12, 10 | date: '%Y-%m-%d' }}" data-tags="{{ post.categories | join: ',' }}" data-status="{{ post.status }}" data-session="{{ post.session }}">
        <td style="border: 1px solid lightgrey; padding: 18px;">{{ forloop.index }}</td>
        <!-- <td style="border: 1px solid lightgrey; padding: 18px;">
          <a href="{{ post.url }}" 
             style="{% if post.level == 'hard' %}color: #f44336;{% elsif post.level == 'medium' %}color: #f68140;{% endif %}">
             {{ post.level }}
          </a>
        </td> -->
         <td style="border: 1px solid lightgrey; padding: 18px;"><a href="{{ post.url }}"  style="color: #45818e" >{{ post.title }}</a></td>
        <td style="border: 1px solid lightgrey; padding: 18px;"><a href="{{ post.url }}" style="color: #0d94e7;">{{ post.categories | join: ", " }}</a></td>
        <!-- <td style="border: 1px solid lightgrey; padding: 18px;">{{ post.category }}</td>
        <td style="border: 1px solid lightgrey; padding: 18px;">{{ post.status }}</td> -->
        <!-- <td style="border: 1px solid lightgrey; padding: 18px;">{{ post.session }}</td>   -->
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

document.getElementById('session1Checkbox').addEventListener('change', filterTable);

document.getElementById('session2Checkbox').addEventListener('change', filterTable);


function normalizeString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

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

document.getElementById('manualTagInput')?.addEventListener('input', filterTable);
document.getElementById('searchCategory').addEventListener('input', filterTable);
document.getElementById('sessionCheckbox')?.addEventListener('change', function() {
    // console.log('Session Checkbox Changed');
    filterTable();
});

function normalizeString(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

function filterTable() {
    var checkboxes = document.querySelectorAll('.tag-filter input[type="checkbox"]');
    var selectedTags = Array.from(checkboxes).filter(function(checkbox) {
        return checkbox.checked && checkbox.id !== 'oneStarCheckbox' && checkbox.id !== 'twoStarCheckbox' && checkbox.id !== 'session1Checkbox' && checkbox.id !== 'session2Checkbox';
    }).map(function(checkbox) {
        return normalizeString(checkbox.value);
    });

    var manualTag = normalizeString(document.getElementById('manualTagInput')?.value.trim() || '');
    if (manualTag) {
        selectedTags.push(manualTag);
    }

    var filterOneStar = document.getElementById('oneStarCheckbox').checked;
    var filterTwoStar = document.getElementById('twoStarCheckbox').checked;
    var filterSession1 = document.getElementById('session1Checkbox').checked;
    var filterSession2 = document.getElementById('session2Checkbox').checked;
    var query = normalizeString(document.getElementById('searchCategory').value.trim());

    var rows = document.querySelectorAll('table tbody tr');
    var visibleIndex = 1;

    rows.forEach(function(row) {
        var tags = row.getAttribute('data-tags');
        var status = row.querySelector('td:nth-child(6)').textContent.trim();
        var session = row.getAttribute('data-session')?.trim();
        var category = normalizeString(row.querySelector('td:nth-child(5)').textContent);

        var showRow = true;

        // Check if tags match the selected tags
        if (selectedTags.length > 0) {
            if (tags) {
                tags = tags.split(',').map(normalizeString);
                showRow = selectedTags.every(function(tag) {
                    return tags.includes(tag);
                });
            } else {
                showRow = false;
            }
        }

        // Apply "One Star" filter if checked
        if (filterOneStar && status !== '★') {
            showRow = false;
        }

        // Apply "Two Star" filter if checked
        if (filterTwoStar && status !== '★★') {
            showRow = false;
        }

        // Apply Session1 filter if checked
        if (filterSession1 && session !== '1') {
            showRow = false;
        }

        // Apply Session2 filter if checked
        if (filterSession2 && session !== '2') {
            showRow = false;
        }

        // If there's a query, match it against the category
        if (query && !category.includes(query)) {
            showRow = false;
        }

        // Show or hide the row based on the filters
        row.style.display = showRow ? '' : 'none';

        // Reset index for visible rows
        if (showRow) {
            row.querySelector('td:nth-child(1)').textContent = visibleIndex++;
        }
    });
}


</script>
