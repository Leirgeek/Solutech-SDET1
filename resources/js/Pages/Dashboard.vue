<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Welcome from '@/Components/Welcome.vue';
</script>

<template>
    <AppLayout title="Dashboard">
        <div
            class="rounded-md  p-1 md:p-6 mx-1 md:mx-4 lg:mx-12 my-2 mx-auto "
        >
            <div v-if="loaded" class="grid grid-cols-12 px-3 py-4 gap-2">
                <div
                    class="col-span-12 bg-[#7C6100] rounded-md  gap-2 py-[40px] px-[60px] h-[168px] group group-hover:translate-y-1 duration-1000 flex flex-col justify-center rounded-md md:col-span-3  items-center">
                    <div class="text-[18px] font-[inter] text-center  text-white font-normal"> Total Bookings</div>
                    <div class="text-3xl text-center text-white font-semibold flex flex-col">
                        <span> {{ total_bookings }}</span>
                    </div>
                    <div class="text-1xl text-center text-white font-normal">This week</div>

                </div>


                <div
                    class="col-span-12 bg-[#FFFFFF]rounded-md border border-[#2CB34A] gap-2 py-[40px] px-[60px] h-[168px] group group-hover:translate-y-1 duration-1000 flex flex-col justify-center rounded-md md:col-span-3  items-center">
                    <div class="text-[18px] font-[inter] text-center text-[#444444] font-normal"> Pending Bookings</div>
                    <div class="text-3xl text-center text-[#188518] font-semibold flex flex-col">
                        <span>{{ pending_bookings }}</span>
                    </div>
                    <div class="text-1xl text-center text-[#444444] font-normal">This week</div>
                </div>


                <div
                    class="col-span-12 bg-[#0091D8] rounded-md  gap-2 py-[40px] px-[60px] h-[168px] group group-hover:translate-y-1 duration-1000 flex flex-col justify-center rounded-md md:col-span-3  items-center">
                    <div class="text-[18px] font-inter text-center text-white font-normal"> Confirmed Bookings</div>
                    <div class="text-3xl text-center text-white font-semibold flex flex-col">
                        <span>{{ confirmed_bookings }}</span>

                    </div>
                    <div class="text-1xl text-center text-white font-normal">This week</div>

                </div>
                <div
                    class="col-span-12 bg-[#000000] rounded-md gap-2 py-[40px] px-[60px] h-[168px] group group-hover:translate-y-1 duration-1000 flex flex-col justify-center rounded-md md:col-span-3  items-center">
                    <div class="text-[17px] font-[inter] text-center text-white font-normal">Cancelled Bookings</div>
                    <div class="text-3xl text-center text-white font-semibold flex flex-col">
                        <span>{{cancelled_bookings}}</span>
                    </div>
                    <div class="text-1xl text-center text-white font-normal">This week</div>

                </div>
                <div
                    class="col-span-12 bg-[#104A66] rounded-md  gap-2 py-[40px] px-[60px] h-[168px] group group-hover:translate-y-1 duration-1000 flex flex-col justify-center rounded-md md:col-span-3  items-center">
                    <div class="text-[18px] font-[inter] text-center text-white font-normal">Total Tickets</div>
                    <div class="text-[28px] whitespace-no-wrap text-center text-white font-semibold flex flex-col">
                        <text>{{total_tickets}}</text>
                    </div>
                    <div class="text-1xl text-center text-white font-normal">This week</div>

                </div>
                <div
                    class="col-span-12 bg-[#FF6F0F] rounded-md gap-2 py-[40px] px-[60px] h-[168px] group group-hover:translate-y-1 duration-1000 flex flex-col justify-center rounded-md md:col-span-3  items-center">
                    <div class="text-[18px] font-[inter] text-center text-white font-normal">Total Revenue</div>
                    <div class="text-3xl text-center text-white font-semibold flex flex-col">
                        <span>{{ total_revenue }}</span>
                    </div>
                    <div class="text-1xl text-center text-white font-normal">All time</div>

                </div>
                <div
                    class="col-span-12 bg-[#188518] rounded-md  gap-2 py-[40px] px-[60px] h-[168px] group group-hover:translate-y-1 duration-1000 flex flex-col justify-center rounded-md md:col-span-3  items-center">
                    <div class="text-[18px] font-[inter] text-center text-white font-normal">Total Tours</div>
                    <div class="text-3xl text-center text-white font-semibold flex flex-col">
                        <span>{{ total_tours }}</span>
                    </div>
                    <div class="text-1xl text-center text-white font-normal">All time</div>

                </div>
                <div
                    class="col-span-12 bg-[#CD0606] rounded-md gap-2 py-[40px] px-[60px] h-[168px] group group-hover:translate-y-1 duration-1000 flex flex-col justify-center rounded-md md:col-span-3  items-center">
                    <div class="text-[18px] font-[inter] text-center text-white font-normal">Total Destinations</div>
                    <div class="text-3xl text-center text-white font-semibold flex flex-col">
                        <span>{{ total_destinations }}</span>
                    </div>
                    <div class="text-1xl text-center text-white font-normal">All time</div>

                </div>
                <div class="col-span-12 bg-[#FFFFFF] border border-[#3FBBF8] px-2 rounded-md mt-6 py-4 grid grid-cols-1 md:grid-cols-12 gap-4">

                    <div
                        class="md:col-span-6 col-span-12 bg-[#07183E] rounded-md  w-gap-2 py-16 px-32 group group-hover:translate-y-1 duration-1000 flex flex-col justify-center gap-2 rounded-md sm-0 items-center">
                        <div class="flex justify-center items-center">
                        </div>
                        <div class="text-1xl text-center text-white font-normal">Admin Users</div>
                        <div class="text-3xl text-center text-white font-semibold flex flex-col">
                            <span>{{ admin_users }}</span>
                        </div>
                    </div>
                    <div  class="md:col-span-6 col-span-12 bg-[#07183E] rounded-md  py-16 px-32 group group-hover:translate-y-1 duration-1000 flex flex-col sm:flex-col justify-center md:gap-2 gap-1 rounded-md sm-0 items-center">

                        <div class="flex justify-center items-center">
                        </div>
                        <div class="text-1xl text-center text-white font-normal">Total Number of Customers</div>
                        <div class="text-3xl text-center text-white font-semibold flex flex-col">
                            <span>{{ users }}</span>
                        </div>


                    </div>
                </div>
            </div>

            <div
                v-if="loading_data"
                class="grid grid-cols-12 px-3 py-4 gap-2 justify-center align-items-center items-center "
            >
                <div class="col-col-span-12">
                    <Spin size="large" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script>

export default {
    data() {
        return {
            total_bookings: 0,
            pending_bookings: 0,
            confirmed_bookings: 0,
            cancelled_bookings: 0,
            total_tickets: 0,
            total_revenue: 0,
            total_tours: 0,
            total_destinations: 0,
            admin_users: 0,
            users: 0,
            loading_data: false,
            loaded: false,
        };
    },

    created() {
        this.getStats();
    },
    props: ["auth_user"],
    methods: {
        async getStats() {
            this.loading_data = true;
            this.loaded = false;

            axios.get(route('api.dashboard.stats'))
                .then(response => {

                    if(response.status === 201){
                        this.modal_loading = false;
                        this.total_bookings = response.data.total_bookings;
                        this.pending_bookings = response.data.pending_bookings;
                        this.confirmed_bookings = response.data.confirmed_bookings;
                        this.cancelled_bookings = response.data.cancelled_bookings;
                        this.total_destinations = response.data.total_destinations;
                        this.total_tickets = response.data.total_tickets;
                        this.total_revenue = response.data.total_revenue;
                        this.total_tours = response.data.total_tours;
                        this.total_destinations = response.data.total_destinations;
                        this.admin_users = response.data.admin_users;
                        this.users = response.data.users;
                        this.loaded = true;
                        this.loading_data = false;

                        this.stop_loading();
                    }else{
                        this.loading_data = false;
                        this.loading_error();
                    }
                })
                .catch(error => {
                    this.loading_data = false;
                    this.loading_error();
                });
        },
    },
};
</script>
