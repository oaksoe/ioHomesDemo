exports.QUEUE_NAME = 'prep';

exports.prepareUserData = (user) => {
    return {
        job: 'default',
        dataType: 'user',
        data: {
            id: user.id,
            gender: user.gender || '',
            dob: user.dob || '',
            ic: user.ic || '',
            education: user.education || '',
            jobTitle: user.jobTitle || '',
        }
    }
}