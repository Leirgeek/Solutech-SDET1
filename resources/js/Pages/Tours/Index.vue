<template>
    <AppLayout title="Dashboard" class="pb-4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Tours
            </h2>
        </template>
        <div class="mt-2  md:mx-16">
            <div class="grid grid-cols-12 gap-8 mb-2">
                <div class="mt-2 col-span-6 sm:col-span-12 md:col-span-4 gap-4 justify-end">
                    <Button :size="'large'" type="primary" @click="modal_status = true">Create Tour</Button>
                </div>
            </div>
            <Table ref="table" size="default" :columns="columns" stripe :data="tours.data" border>
                <template #action="{ row, index }">
                    <Icon class="cursor-pointer" color="green" size="28" @click="showTourEditModal(row)" type="ios-create" />
                    <Icon class="cursor-pointer" color="red" size="28" @click="deleteRow(row)" type="md-trash" />
                </template>
            </Table>
        </div>
        <div class="flex justify-center mt-4">
            <div class="flex gap-4">
                <Button v-if="tours.prev_page_url" type="primary"
                        @click="goToPage(tours.prev_page_url)">
                    Previous Page
                </Button>
                <Button v-if="tours.first_page_url" type="primary"
                        @click="goToPage(tours.first_page_url)">
                    First Page
                </Button>
                <Button type="default" disabled>
                    On Page {{ tours.current_page }}
                </Button>
                <Button v-if="tours.next_page_url" type="primary"
                        @click="goToPage(tours.next_page_url)">
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
                <p class="text-lg font-semibold">{{edit_mode ? "Edit Tour" : "Create Tour"}}</p>
            </div>
        </template>
        <Form >
            <FormItem label="Tour name">
                <Input type="text" v-model="tour.name" placeholder="Enter tour name">
                </Input>
            </FormItem>
            <FormItem label="Description">
                <Input type="text" v-model="tour.description" placeholder="Enter Tour description">
                </Input>
            </FormItem>

            <FormItem label="Choose Destination">
                <Select placeholder="Choose Destination" v-model="tour.destination_id">
                    <Option v-for="item in destinations" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>

            <FormItem label="Price Per Slot">
                <Input type="number" v-model="tour.price" placeholder="Enter the price per slot">
                </Input>
            </FormItem>
            <FormItem label="Slots Available">
                <Input type="number" v-model="tour.slots" placeholder="Enter the number of slots available">
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
            loading: true,
            modal_status: false,
            tour: {
                name: "",
                description: "",
                price: "",
                slots: "",
                destination_id: ""
            },
            modal_loading: false,
            edit_mode: false,
            columns: [
                {
                    title: 'Tour Name',
                    key: 'name',
                    resizable: true
                },
                {
                    title: 'Description',
                    key: 'description',
                    resizable: true,
                    render: (h, params) => {
                        return h('div', {}, params.row.description ? params.row.description : "Not Available");
                    }
                },
                {
                    title: 'Destination',
                    key: 'destination',
                    resizable: true,
                    render: (h, params) => {
                        return h('div', {}, params.row.destination?.name);
                    }
                },
                {
                    title: 'Slots Available',
                    key: 'slots',
                    resizable: true
                },
                {
                    title: 'Price Per Slot',
                    key: 'price',
                    resizable: true
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
        tours: Object,
        destinations: Array
    },
    methods: {
        deleteRow(row) {
            this.$Modal.confirm({
                title: 'Delete Tour',
                content: 'Are you sure you want to delete this tour?',
                okText: 'Delete',
                cancelText: 'Cancel',
                onOk: () => {
                    let url = this.route('api.tours.destroy', {id: row.id});
                    axios.delete(url)
                        .then(response => {
                            if (response.status === 201) {
                                this.show_success_message("Tour deleted successfully!");
                                this.$inertia.visit(route('tours.index'))
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

            let url = this.route('api.tours.update', {id: this.tour.id});

            let data = {
                name: this.tour.name,
                destination_id: this.tour.destination_id,
                price: this.tour.price,
                slots: this.tour.slots,
                description: this.tour.description
            }

            axios.put(url, data)
                .then(response => {
                    if(response.status === 201){
                        this.modal_loading = false;
                        this.modal_status = false;
                        this.$inertia.visit(route('tours.index'));

                        this.disciplineData = {
                            name: "",
                            description: "",
                        };
                        this.show_success_message("Tour updated successfully!");
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

            if(this.tour.name === ""){
                this.show_error_message("Please fill in the discipline name.");
                this.modal_loading = false;
                return;
            }

            if(this.edit_mode){
                this.update();
                return;
            }

            let url = this.route('api.tours.store');

            axios.post(url, this.tour)
                .then(response => {
                    if(response.status === 201){
                        this.modal_loading = false;
                        this.modal_status = false;
                        this.tour = {
                            name: "",
                            description: "",
                        };

                        this.$inertia.visit(route('tours.index'));

                        this.show_success_message("Tour created successfully!");
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
        showTourEditModal(row) {
            this.edit_mode = true;
            this.modal_status = true;
            this.tour = row;
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
