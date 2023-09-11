---
title: list of algorithm
feature_text: |
  ## AilswanCoding
  This is a notebook for Ailswan to improving coding skills
feature_image: "https://picsum.photos/1300/400?image=989"
excerpt: "Alembic is a starting point for [Jekyll](https://jekyllrb.com/) projects. Rather than starting from scratch, this boilerplate is designed to get the ball rolling immediately. Install it, configure it, tweak it, push it."
---
<select id="sortDropdown">
    <option value="time">Sort by Time</option>
    <option value="level">Sort by Level</option>
    <option value="problemName">Sort by Problem Name</option>
</select>

<table style="border-collapse: collapse; width: 100%; padding: 18px;">
  <tr>
    <th style="text-align:center; border: 1px solid lightgrey; padding: 18px;">No.</th>
    <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Level</th>
    <th style="text-align:center; border: 1px solid lightgrey; padding: 18px;">Problem Name</th>
    <th style="text-align:left; border: 1px solid lightgrey; padding: 18px;">Tags</th>
  </tr>
 {% for post in site.posts %}
<tr data-time="{{ post.feature_text | slice: -12, 10 | date: '%Y-%m-%d' }}">
    <td style="border: 1px solid lightgrey; padding: 18px;">{{ forloop.index }}</td>
    <td style="border: 1px solid lightgrey; padding: 18px;">
      <a href="{{ post.url }}" 
         style="{% if post.level == 'hard' %}color: #f44336;{% elsif post.level == 'medium' %}color: #f68140;{% endif %}">
         {{ post.level }}
      </a>
    </td>
    <td style="border: 1px solid lightgrey; padding: 18px;"><a href="{{ post.url }}"  style="color: #45818e" >{{ post.title }}</a></td>
    <td style="border: 1px solid lightgrey; padding: 18px;"><a href="{{ post.url }}" style="color: #0d94e7;">{{ post.categories | join: ", " }}</a></td>
</tr>
{% endfor %}
</table>

<!-- JavaScript for sorting -->
<script>
document.getElementById('sortDropdown').addEventListener('change', function() {
    var sortingMethod = this.value;
    var tbody = document.querySelector('table tbody');
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr:not(:first-child)'));  // Exclude the header row
    
    rows.sort(function(a, b) {
        switch(sortingMethod) {
            case 'time':
                var dateA = new Date(a.getAttribute('data-time'));
                var dateB = new Date(b.getAttribute('data-time'));
                return dateB - dateA;  // We are sorting in descending order for newer posts to appear first.
            case 'level':
                return a.querySelector('td:nth-child(2)').textContent.localeCompare(b.querySelector('td:nth-child(2)').textContent);
            case 'problemName':
                var numA = parseInt(a.querySelector('td:nth-child(3)').textContent.match(/^\d+/));
                var numB = parseInt(b.querySelector('td:nth-child(3)').textContent.match(/^\d+/));
                return numA - numB;
        }
    });

    rows.forEach(function(row) {
        tbody.appendChild(row);
    });
});
</script>
