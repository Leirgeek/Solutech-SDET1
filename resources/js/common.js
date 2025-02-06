export default {
    methods: {
        uc_first(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        show_error_message(error_message) {
            this.show_message(error_message, 'error')
        },
        show_success_message(success_message) {
            this.show_message(success_message, 'success')
        },
        show_validation_error_message(http_response) {
            for (let key in http_response.data.errors) {
                this.show_error_message(http_response.data.errors[key][0]);
            }
        },
        start_loading() {
            this.$Loading.start();
        },
        stop_loading() {
            this.$Loading.finish();
        },
        loading_error() {
            this.$Loading.error();
        },
        show_http_errors(http_response) {
            switch (http_response.status) {
                case 204:
                    this.show_error_message('Deleted Successfully');
                    break;
                case 401:
                    this.show_error_message('Unauthorized');
                    break;
                case 400:
                    this.show_error_message(http_response.data.message);
                    break;
                case 403:
                    this.show_error_message('Forbidden');
                    break;
                case 404:
                    this.show_error_message('Not Found');
                    break;
                case 419:
                    this.show_error_message('Page Expired');
                    break;
                case 422:
                    this.show_validation_error_message(http_response);
                    break;
                case 500:
                    this.show_error_message('Server Error');
                    break;
                case 503:
                    this.show_error_message('Service Unavailable');
                    break;
                default:
                    this.show_error_message('Something went wrong');
                    break;
            }
        },
        show_message(message, type) {
            return this.$Message[type]({
                content: message,
                duration: 10,
                closable: true
            })
        },
    }
}
