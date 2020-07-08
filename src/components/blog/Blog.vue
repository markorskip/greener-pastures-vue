<template>
    <b-container>
        <b-row>
                <b-col cols="12" v-for="post in mockData" v-bind:key="post.index" class="mb-3" style="min-width: 13rem">
                <b-card>
                    <b-row no-gutters>
                        <b-col md="7">
                            <b-card-img :src="post.imgSrc" alt="Image" class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="5">
                            <b-card-body :title="post.title">
                                <b-card-text>
                                    {{ post.description }}
                                    {{ post.index }}
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                 </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from "axios";

    export default {
        methods: {
            returnRandomImageSrc(index) {
              const imgSrc = "https://picsum.photos/600/400/?image=";
              let src = imgSrc + (index * 25);
              console.log(src)
              return src;
          },
            returnRandomPost(index) {
                let title = '';
                let post;
                axios.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random")
                    .then(response => ({post.title = response.data.message}))
                    .catch(e => console.log(e));
                return {
                    title: title,
                    description: 'Random description',
                    imgSrc: this.returnRandomImageSrc(index)
                }
            }
        },
        computed: {
            mockData() {
                let elements = 15;
                let listOfPost = [];
                for (let index = 0; index < elements; index++) {
                    listOfPost.push(this.returnRandomPost(index));
                }
                return listOfPost;
            }
        }
    };
</script>
