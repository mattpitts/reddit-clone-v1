export const seeds = [
	{
		author: "BobRoss187",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		time: Date.now() - 55000,
		title: "I like turtles",
		url: "http://lorempixel.com/200/200",
		upvotes: 1,
		downvotes: 0,
		filtered: false,
		comments: []
	},
	{
		author: "87899837933988",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		time: 1500508612944,
		title: "You won't believe this",
		url: "http://lorempixel.com/200/200",
		upvotes: 1,
		downvotes: 0,
		filtered: false,
		comments: []
	},
	{
		author: "Nickelback",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		time: Date.now(),
		title: "Some Cat Pics",
		url: "http://lorempixel.com/200/200",
		upvotes: 100,
		downvotes: 110,
		filtered: false,
		comments: [
			{
				body: "That is sweeet",
				time: Date.now() - 10000000,
				upvotes: 10,
				downvotes: 2,
				comments: [
					{
						body: "Upbote for positivity",
						time: Date.now() - 1000000,
						upvotes: 36,
						downvotes: 0,
						comments: [
							{
								body: "Trump is an orange bitch",
								time: Date.now()-40000,
								upvotes: 1,
								downvotes: 0,
								comments: [
									{
										body: "^^ this",
										time: Date.now()-30000,
										upvotes: 1,
										downvotes: 0,
										comments: [
											{
												body: "I've always liked you, guest",
												time: Date.now()-20000,
												upvotes: 1,
												downvotes: 0,
												comments: [
													{
														body: "Who me?",
														time: Date.now()-10000,
														upvotes: 1,
														downvotes: 5,
														comments: [
															{
																body: "No the dude I replid to idiot",
																time: Date.now(),
																upvotes: 1,
																downvotes: 20,
																comments: []
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{
						body: "Wholesome reddit",
						time: Date.now() - 30000,
						upvotes: 1,
						downvotes: 0,
						comments: [
							{
								body: "Fuck off",
								time: Date.now() - 1000,
								upvotes: 1,
								downvotes: 3,
								comments: []
							}
						]
					}
				]
			},
			{
				body: "repost. how could u waste my time with this nonsense.",
				time: Date.now() - 100000,
				upvotes: 1,
				downvotes: 60,
				comments: []
			}
		]
	}
];
