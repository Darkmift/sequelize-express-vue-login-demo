<template>
	<v-container>
		<h1>Home</h1>
		<v-row>
			<v-col cols="6" v-for="user in users" :key="user.id">
				<v-card class="mx-auto my-2" max-width="344">
					<v-card-text>
						<div>{{ user.username | capitalize }}</div>
						<p class="text-h4 text--primary">
							{{ user.first_name | capitalize }}
						</p>
						<p>{{ user.last_name | capitalize }}</p>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "Home",
	components: {},
	data() {
		return {
			users: [],
		};
	},
	created() {
		this.$http.get("user").then((res) => {
			console.log(
				"🚀 ~ file: Home.vue ~ line 17 ~ this.$http.get ~ res",
				res.data.users
			);
			this.users = res.data.users;
		});
	},
};
</script>
