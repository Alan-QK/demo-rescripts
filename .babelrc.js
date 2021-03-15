module.exports = {
    "presets": [
        "react-app"
    ],
    "plugins": [
        "react-require",
        [
            "module-resolver",
            {
                "root": "./src",
                "alias": {
                    "assets/*": ["assets/*"],
                    "components/*": ["components/*"],
                    "i18n": "i18n/index",
                    "services/*": ["services/*"],
                    "lib/*": ["lib/*"],
                    "utils": ["utils/*"],
                    "store": "store/index",
                    "page/*": ["page/*"]
                }
            }
        ]
    ]
}