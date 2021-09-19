<template>
	<v-container class="register pa-6">
		<v-row>
			<v-col cols="8 offset-2">
				<h3>Register</h3>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
						v-for="(inputName, index) in Object.keys(formData)"
						:key="index"
						v-model="formData[inputName]"
						:rules="inputRules"
						:label="inputName | capitalize | removeUnderscore"
						:type="inputName === 'password' ? 'password' : 'text'"
						:autocomplete="inputName === 'password' ? 'off' : 'autocomplete'"
						required
					></v-text-field>

					<v-btn
						:disabled="!valid"
						color="success"
						class="mr-4"
						@click="submitForm"
					>
						Register
					</v-btn>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import submitUserFormData from "../../mixins/submitUserFormData.mixin";

export default {
	name: "Register",
	mixins: [submitUserFormData],
	data() {
		return {
			valid: true,
			formData: {
				username: "",
				password: "",
				first_name: "",
				last_name: "",
			},
			inputRules: [
				(v) => !!v || "Name is required",
				(v) => (v && v.length <= 10) || "Name must be less than 10 characters",
			],
		};
	},

	methods: {
		async submitForm() {
			const validationResult = this.$refs.form.validate();
			if (!validationResult) {
				this.$toast.open({
					message: "Please fix validation errors and try again...",
					type: "error",
				});
				return;
			}

			this.sendUserDetailsToServer({
				endpoint: "/user/register",
				userDetails: this.formData,
			});
		},
	},
};
</script>