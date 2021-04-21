$('document').ready(function() {
    $("#filterInput").on("keyup", function() {
        const value = $(this).val().toLowerCase();
        $("#filterTable tbody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
