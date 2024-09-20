export const tools = [
    {
        type: 'function',
        function: {
            name: 'get_time',
            description: 'get the current system time, ',
            parameters: {
                type: 'object',
                required: [],
                properties: {
                }
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'register_device',
            description: 'register a new IOT device like lamps and sensors',
            parameters: {
                type: 'object',
                required: ['name', 'ip'],
                properties: {
                    name: {
                        type: 'string',
                        description: 'name of the device'
                    },
                    ip: {
                        type: 'string',
                        description: 'ip address of the device'
                    }
                }
            }
        }
    }
]