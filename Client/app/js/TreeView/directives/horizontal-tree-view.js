/**
 * Created by sasaner on 10/5/15.
 */
barcoApp.
    directive('horizontalTreeView', [function () {
        return {
            templateUrl: 'views/treeView/horizontalTreeView.html',
            scope: {
                workStationType: "=",
                action: "="
            },
            controller: 'horizontalTreeViewController',
            restrict: "E"

        };
    }]);