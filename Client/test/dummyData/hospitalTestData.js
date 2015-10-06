/**
 * Created by sasaner on 10/6/15.
 */


var hospitalTreeData =
[
    {"_id": "56135390cb17309437334301", "name": "Zen Hospital", "address": "5 Albert Road", "type": "hospital", "__v": 0, "LocationId": [
        {"_id": "561353b0cb17309437334302", "name": "Building 1", "address": "Alber Road 1", "hospitalId": "56135390cb17309437334301", "type": "location", "__v": 0, "hierarchyId": [
            {"_id": "561353f2cb17309437334304", "name": "Pathology Lab 1", "address": "Alber Road", "locationId": "561353b0cb17309437334302", "order": 1, "type": "hierarchy", "__v": 0, "assetId": [
                {"_id": "561354c9cb17309437334307", "name": "Machine  1", "hierarchyId": "561353f2cb17309437334304", "type": "asset", "__v": 0, "properties": [
                    {"name": "Property", "value": "1", "_id": "561354c9cb17309437334308"}
                ]}
            ]},
            {"_id": "56135419cb17309437334305", "name": "Histology Lab", "address": "Albert Road", "locationId": "561353b0cb17309437334302", "order": 2, "type": "hierarchy", "__v": 0, "assetId": []},
            {"_id": "56135436cb17309437334306", "name": "Cytology Lab", "address": "Alber Road", "locationId": "561353b0cb17309437334302", "order": 3, "type": "hierarchy", "__v": 0, "assetId": []}
        ]},
        {"_id": "561353d5cb17309437334303", "name": "Building B", "address": "Albert Road", "hospitalId": "56135390cb17309437334301", "type": "location", "__v": 0, "hierarchyId": []}
    ]},
    {"_id": "56135570cb17309437334309", "name": "Fortis Hospital", "address": "Baner Road", "type": "hospital", "__v": 0, "LocationId": [
        {"_id": "56135585cb1730943733430a", "name": "Baner Road", "address": "Baner Road", "hospitalId": "56135570cb17309437334309", "type": "location", "__v": 0, "hierarchyId": [
            {"_id": "5613560fcb1730943733430b", "name": "Wing A", "address": "Baner Road", "locationId": "56135585cb1730943733430a", "order": 1, "type": "hierarchy", "__v": 0, "assetId": [
                {"_id": "561358e7cb1730943733430e", "name": "MDNC1", "hierarchyId": "5613560fcb1730943733430b", "type": "asset", "__v": 0, "properties": []}
            ]}
        ]}
    ]}
];
var hospitalTreeData1 =
    [
        {"_id": "56135390cb17309437334301", "name": "Zen Hospital", "address": "5 Albert Road", "type": "hospital", "__v": 0, "LocationId": [
            {"_id": "561353b0cb17309437334302", "name": "Building 1", "address": "Alber Road 1", "hospitalId": "56135390cb17309437334301", "type": "location", "__v": 0, "hierarchyId": [
                {"_id": "561353f2cb17309437334304", "name": "Pathology Lab 1", "address": "Alber Road", "locationId": "561353b0cb17309437334302", "order": 1, "type": "hierarchy", "__v": 0, "assetId": [
                    {"_id": "561354c9cb17309437334307", "name": "Machine  1", "hierarchyId": "561353f2cb17309437334304", "type": "asset", "__v": 0, "properties": [
                        {"name": "Property", "value": "1", "_id": "561354c9cb17309437334308"}
                    ]}
                ]},
                {"_id": "56135419cb17309437334305", "name": "Histology Lab", "address": "Albert Road", "locationId": "561353b0cb17309437334302", "order": 2, "type": "hierarchy", "__v": 0, "assetId": []},
                {"_id": "56135436cb17309437334306", "name": "Cytology Lab", "address": "Alber Road", "locationId": "561353b0cb17309437334302", "order": 3, "type": "hierarchy", "__v": 0, "assetId": []}
            ]},
            {"_id": "561353d5cb17309437334303", "name": "Building B", "address": "Albert Road", "hospitalId": "56135390cb17309437334301", "type": "location", "__v": 0, "hierarchyId": []}
        ]},
        {"_id": "56135570cb17309437334309", "name": "Fortis Hospital", "address": "Baner Road", "type": "hospital", "__v": 0, "LocationId": [
            {"_id": "56135585cb1730943733430a", "name": "Baner Road", "address": "Baner Road", "hospitalId": "56135570cb17309437334309", "type": "location", "__v": 0, "hierarchyId": [
                {"_id": "5613560fcb1730943733430b", "name": "Wing A", "address": "Baner Road", "locationId": "56135585cb1730943733430a", "order": 1, "type": "hierarchy", "__v": 0, "assetId": [
                    {"_id": "561358e7cb1730943733430e", "name": "MDNC1", "hierarchyId": "5613560fcb1730943733430b", "type": "asset", "__v": 0, "properties": []}
                ]}
            ]}
        ]}
    ]

