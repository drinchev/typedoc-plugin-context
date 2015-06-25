/**
 * Entry point of the plugin.
 *
 * TypeDoc will call the exported function of the plugin upon loading. Setup the plugin
 * and attach event listeners to the required components:
 * - app: Main application instance,
 *   see http://typedoc.io/api/classes/td.application.html
 * - app.converter: Converts TypeScript compiler symbols to reflections,
 *   see http://typedoc.io/api/modules/td.converter.html
 * - app.renderer: Renders resolved reflections to templates,
 *   see http://typedoc.io/api/classes/td.output.renderer.html
 *
 * @param app  The current instance of the TypeDoc application.
 * @param td  The TypeDoc namespace.
 */
module.exports = function (app, td) {
    var version = '0.0.1';
    var contextJSON;
    /**
     * Add additional options to the options parser.
     *
     * See http://typedoc.io/api/interfaces/td.iparameter.html for details on the available configuration.
     */
    app.on(td.Application.EVENT_COLLECT_PARAMETERS, function (parser) {
        parser.addParameter({
            name: 'context',
            help: 'JSON string that will be passed to handlebars template.',
            defaultValue: null
        });
    });
    /**
     * When the converter begins, process the context file.
     */
    app.converter.on(td.converter.Converter.EVENT_BEGIN, function (context) {
        contextJSON = JSON.parse(app.options.context);
    });
    /**
     * When the renderer begins, process the given guide directory.
     */
    app.renderer.on(td.output.Renderer.EVENT_BEGIN_PAGE, function (page) {
        for (var key in contextJSON) {
            page[key] = contextJSON[key];
        }
    });
};
