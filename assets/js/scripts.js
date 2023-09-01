// Ensure the jQuery library has been loaded before this script
$(document).ready(function() {

    // Event listener for the clickable tags
    $('.essay-tag').on('click', function(e) {
        e.preventDefault(); // Prevent default behavior (like navigation)

        // Get the data-tag attribute from the clicked tag
        const tagClicked = $(this).data('tag');

        // Select all essays
        const allEssays = $('.essay');

        // Detach the essays from the DOM temporarily
        const detachedEssays = allEssays.detach();

        // Sort the essays based on tags
        detachedEssays.sort(function(a, b) {
            // Check if each essay has the clicked tag
            const aHasTag = $(a).data('tags').split(',').includes(tagClicked);
            const bHasTag = $(b).data('tags').split(',').includes(tagClicked);

            // Sorting logic to push essays with the tag to the top
            return (bHasTag - aHasTag) || $(a).text().localeCompare($(b).text());
        });

        // Re-append the sorted essays back to the main container
        // Replace '.essays-container' with the actual container where you want to append the essays
        $('.article').append(detachedEssays);
    });

});
