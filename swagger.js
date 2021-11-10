module.exports = {
    swagger: "2.0",
    info: {
        version: "1.0.0",
        title: "GoFood",
        description: "GoFood API Documentation",
        contact: {
            name: "Guru Pandit",
            email: "gurupandit28@gmail.com"
        },
    },
    servers: [
        {
            url: "http://localhost:8080",
            description: "Local server"
        }
    ],
    tags: {
        name: "GoFood APIs"
    },
    paths: {
        '/cuisines': {
            get: {
                tags: ["Cuisines"],
                description: "GET all cuisines",
                operationId: "getAllCuisines",
                parameters: [],
                responses: {
                    '200': {
                        description: "Successfully fetched",
                        content: {
                            'application/json': {
                                schema: {
                                    id: {
                                        type: "integer"
                                    },
                                    name: {
                                        type: "string"
                                    },
                                    createdAt: {
                                        type: "string"
                                    },
                                    updatedAt: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/filterrestaurants': {
            post: {
                tags: ["Restaurants"],
                description: "Filter restaurant by review",
                operationId: "filterRestaurant",
                parameters: [
                    {
                        in: "body", name: "review", description: "Filter restaurant",
                        schema: {
                            type: "object",
                            properties: {
                                review: {
                                    type: "number"
                                }
                            }
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: "Restaurant fetched successfully",
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            }
        },
        '/getmenuitemsbyrestaurant/{restaurantId}': {
            get: {
                tags: ["Menuitems"],
                description: "Get menuitems by restaurant ID",
                operationId: "getMenuitemsByRestaurant",
                parameters: [
                    {
                        name: "restaurantId",
                        in: "path",
                        schema: {
                            restaurantId: {
                                type: "integer",
                            }
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: "Menuitems fetched successfully",
                        content: {
                            'application/json': {
                                schema: {
                                    id: {
                                        type: "integer",
                                    },
                                    name: {
                                        type: "string",
                                    },
                                    description: {
                                        type: "string",
                                    },
                                    image: {
                                        type: "array",
                                    },
                                    price: {
                                        type: "number",
                                    },
                                    restaurantId: {
                                        type: "integer",
                                    },
                                    mealtypeId: {
                                        type: "integer",
                                    },
                                    cuisineId: {
                                        type: "integer",
                                    },
                                    createdAt: {
                                        type: "string",
                                    },
                                    updatedAt: {
                                        type: "string",
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            }
        },
        '/profileImage/{userId}': {
            post: {
                tags: ["User"],
                summary: "Upload profile picture",
                consumes: ["multipart/form-data"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        schema: {
                            userId: {
                                type: "integer",
                            }
                        }
                    },
                    {
                        in: "formData",
                        name: "image",
                        type: "file"
                    }
                ],
                responses: {
                    '200': {
                        description: "File upload successfully",
                    },
                    '400': {
                        description: "File upload failed",
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            }
        }
    }
}