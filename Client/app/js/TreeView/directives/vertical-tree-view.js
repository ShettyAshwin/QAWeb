/**
 * Created by sasaner on 10/5/15.
 */


(function (f) {
    f.module("angularTreeview", []).directive("treeModel", function ($compile) {
        return{restrict: "A", link: function (b, h, c) {

            var a = c.treeId, g = c.treeModel, e = c.nodeLabel || "label", d = c.nodeChildren || "children", t = c.nodeType, e = '<ul>' +

                '<li data-ng-repeat="node in ' + g + '">' +

                '<i class="{{node.type==\'asset\' ? \'normal\' : node.children.length && !node.collapsed ?  \'expanded\': \'collapsed\'}}" ' +
                'data-ng-click="' + a + '.selectNodeHead(node)"></i>' +
                '<span data-ng-class="node.selected" data-ng-click="' + a + '.selectNodeLabel(node)">{{node.' + e + '}}</span>' +
                '<div data-ng-hide="node.collapsed" data-tree-id="' + a + '" data-tree-model="node.' + d + '" data-node-id=' + (c.nodeId || "id") + " data-node-label=" + e + " data-node-children=" + d + ">" +
                "</div>" +
                "</li>" +
                "</ul>";
            a && g && (c.angularTreeview && (b[a] = b[a] || {}, b[a].selectNodeHead = b[a].selectNodeHead || function (a) {
                a.collapsed = !a.collapsed
            }, b[a].selectNodeLabel = b[a].selectNodeLabel || function (c) {
                b[a].currentNode && b[a].currentNode.selected &&
                (b[a].currentNode.selected = void 0);
                c.selected = "selected";
                b[a].currentNode = c
            }), h.html('').append($compile(e)(b)))
        }}
    })
})(angular);

