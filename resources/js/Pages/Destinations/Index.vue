<template>
    <AppLayout title="Dashboard" class="pb-4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Destinations
            </h2>
        </template>
        <div class="mt-2  md:mx-16">
            <div class="grid grid-cols-12 gap-8 mb-2">
                <div class="mt-2 col-span-6 sm:col-span-12 md:col-span-4 gap-4 justify-end">
                    <Button :size="'large'" type="primary" @click="modal_status = true">Create Destination</Button>
                </div>
            </div>
            <Table ref="table" size="default" :columns="columns" stripe :data="destinations.data" border>
                <template #action="{ row, index }">
                    <Icon class="cursor-pointer" color="green" size="28" @click="showDestinationEditModal(row)" type="ios-create" />
                    <Icon class="cursor-pointer" color="red" size="28" @click="deleteRow(row)" type="md-trash" />
                </template>
            </Table>
        </div>
        <div class="flex justify-center mt-4">
            <div class="flex gap-4">
                <Button v-if="destinations.prev_page_url" type="primary"
                        @click="goToPage(destinations.prev_page_url)">
                    Previous Page
                </Button>
                <Button v-if="destinations.first_page_url" type="primary"
                        @click="goToPage(destinations.first_page_url)">
                    First Page
                </Button>
                <Button type="default" disabled>
                    On Page {{ destinations.current_page }}
                </Button>
                <Button v-if="destinations.next_page_url" type="primary"
                        @click="goToPage(destinations.next_page_url)">
                    Next Page
                </Button>
            </div>
        </div>
    </AppLayout>

    <Drawer
        v-model="modal_status"
        width="400"
        :closable="false"
        :styles="styles"
    >
        <template #header>
            <div class="grid grid-cols-2">
                <p class="text-lg font-semibold">{{edit_mode ? "Edit Destination" : "Create Destination"}}</p>
            </div>
        </template>
        <Form >
            <FormItem label="Destination name">
                <Input type="text" v-model="destination.name" placeholder="Enter destination name">
                </Input>
            </FormItem>
            <FormItem label="Description">
                <Input type="text" v-model="destination.description" placeholder="Enter Destination">
                </Input>
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="modal_status = false">Cancel</Button>
            <Button :disabled="modal_loading" type="primary" @click="store">{{modal_loading ? "Submitting..." : "Submit"}}</Button>
        </div>

    </Drawer>
</template>
<script>

import AppLayout from '@/Layouts/AppLayout.vue';

export default {
    components: {
        AppLayout,
    },
    data() {
        return {
            showing_filtered_data: false,
            search: '',
            date_range: "",
            loading: true,
            modal_status: false,
            destination: {
                name: "",
                description: "",
            },
            modal_loading: false,
            edit_mode: false,
            columns: [
                {
                    title: 'Destination Name',
                    key: 'name',
                    resizable: true
                },
                {
                    title: 'Slug',
                    key: 'slug',
                    resizable: true
                },
                {
                    title: 'Description',
                    key: 'description',
                    resizable: true,
                    render: (h, params) => {
                        //if the cell phone is not available, return the phone number
                        return h('div', {}, params.row.description ? params.row.description : "Not Available");
                    }
                },
                {
                    title: 'Creation Date',
                    key: 'created_at',
                    resizable: true
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            modal: false,
        }
    },
    props: {
        destinations: Object
    },
    methods: {
        deleteRow(row) {
            this.$Modal.confirm({
                title: 'Delete Destination',
                content: 'Are you sure you want to delete this destination?',
                okText: 'Delete',
                cancelText: 'Cancel',
                onOk: () => {
                    let url = this.route('api.destinations.destroy', {id: row.id});
                    axios.delete(url)
                        .then(response => {
                            if (response.status === 201) {
                                this.show_success_message("Destination deleted successfully!");
                                this.$inertia.visit(route('destinations.index'))
                            } else {
                                this.show_error_message("An error occurred. Please try again.");
                            }
                        })
                        .catch(error => {
                            this.show_http_errors(error.response);
                        })
                },
                onCancel: () => {
                }
            });
        },
        update() {

            let url = this.route('api.destinations.update', {id: this.destination.id});

            let data = {
                name: this.destination.name,
                description: this.destination.description
            }

            axios.put(url, data)
                .then(response => {
                    if(response.status === 201){
                        this.modal_loading = false;
                        this.modal_status = false;
                        this.$inertia.visit(route('destinations.index'));

                        this.disciplineData = {
                            name: "",
                            description: "",
                        };
                        this.show_success_message("Destination updated successfully!");
                    }else{
                        this.show_error_message("An error occurred. Please try again.");
                    }
                })
                .catch(error => {
                    this.modal_loading = false;
                    this.modal_status = false;
                    this.show_http_errors(error.response);
                })
        },
        store() {

            this.modal_loading = true;

            if(this.destination.name === ""){
                this.show_error_message("Please fill in the discipline name.");
                this.modal_loading = false;
                return;
            }

            if(this.edit_mode){
                this.update();
                return;
            }

            let url = this.route('api.destinations.store');

            axios.post(url, this.destination)
                .then(response => {
                    if(response.status === 201){
                        this.modal_loading = false;
                        this.modal_status = false;
                        this.destination = {
                            name: "",
                            description: "",
                        };

                        this.$inertia.visit(route('destinations.index'));

                        this.show_success_message("Destination created successfully!");
                    }else{
                        this.show_error_message("An error occurred. Please try again.");
                    }
                })
                .catch(error => {
                    this.modal_loading = false;
                    this.modal_status = false;
                    this.show_http_errors(error.response);
                })
        },
        showDestinationEditModal(row) {
            this.edit_mode = true;
            this.modal_status = true;
            this.destination = row;
        },
        async submitOwnerData(){
            this.loading = true;
            const response = await this.callApi('post', this.route('api.owner.update'), this.owner);
            if (response.status === 200) {
                //close modal
                this.modal = false;
                this.show_success_message(response.data.message);
            } else {
                this.show_http_errors(response);
            }
        },
        goToPage(link) {
            this.start_loading();
            this.$inertia.visit(link);
            this.stop_loading();
        }
    }
}
</script>
