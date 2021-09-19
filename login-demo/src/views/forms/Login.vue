<template>
	<v-container class="pa-6">
		<v-row>
			<v-col cols="8 offset-2">
				<h3>Login</h3>
				<v-form ref="form" v-model="valid" lazy-validation class="login">
					<v-text-field
						v-model="username"
						:counter="10"
						:rules="usernameRules"
						label="Name"
						required
					></v-text-field>

					<v-text-field
						v-model="password"
						:rules="passwordRules"
						label="Password"
						type="password"
						required
					></v-text-field>

					<v-btn
						:disabled="!valid"
						color="success"
						class="mr-4"
						@click="submitForm"
					>
						Log In
					</v-btn>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import submitUserFormData from "../../mixins/submitUserFormData.mixin";
export default {
	name: "Login",
	mixins: [submitUserFormData],
	data: () => ({
		valid: true,
		username: "",
		password: "",
		usernameRules: [
			(v) => !!v || "Name is required",
			(v) => (v && v.length <= 10) || "Name must be less than 10 characters",
		],
		passwordRules: [
			(v) => !!v || "Password is required",
			(v) =>
				(v && v.length <= 10) || "Password must be less than 10 characters",
		],
	}),

	methods: {
		submitForm() {
			const validationResult = this.$refs.form.validate();
			if (!validationResult) {
				this.$toast.open({
					message: "Please fix validation errors and try again...",
					type: "error",
				});
				return;
			}

			const { username, password } = this;

			this.sendUserDetailsToServer({
				endpoint: "/user/login",
				userDetails: { username, password },
			});
		},
	},
};
</script>