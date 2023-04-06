let CONSTENT_VALUES = {
    GLOBALS: {
        LABELS: {
            STALE: "stale",
            AWAITINGRES: "stat:awaiting response",
            BUG: 'type:bug',
            BUG_INSTALL: 'type:build/install',
            TYPE_SUPPORT: 'type:support',
            TYPE_OTHER: 'type:others',
            TYPE_DOCS_BUG: 'type:docs-bug',
            TYPE_PERFORMANCE: 'type:performance'
        },
        STATE: {
            CLOSED: "closed"
        },
        TENSORFLOW_CORE_REPO: 'https://github.com/tensorflow/tensorflow/pull',
        PR_TRIGGER_REPO: 'testRep,keras'
    },
    MODULE: {
        CSAT: {
            YES:'Yes',
            NO:'No',
            CSAT_INCLUDES_REPO:  'tensorflow,tfx,transform,hub,data-validation,model-analysis,' +
            'serving,tfjs,models,mediapipe,keras,TestGitRepository,testRep',
            BASE_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSfaP12TRhd9xSxjXZjcZFNXPG' +
        'k4kc1-qMdv3gc6bEP90vY1ew/viewform?',
            MEDIA_PIPE_BASE_URL: 'https://docs.google.com/forms/d/e/1FAIpQLScOLT8zeBHummIZFnfr9wqvxYzWD1DAypyvNia5WVIWtFANYg/viewform?',
            SATISFACTION_PARAM: 'entry.85265664=',
            ISSUEID_PRAM: '&entry.2137816233=',
            MSG: 'Are you satisfied with the resolution of your issue?',
        },
        TRUSTEDPARTNERS :{}

    }
    
}

const prReviewersTrustedPartners = new Map();
prReviewersTrustedPartners.set('TF-TRT',['sachinprasadhs']);
prReviewersTrustedPartners.set('TFTRT',['sachinprasadhs']);
prReviewersTrustedPartners.set('TF:TRT',['sachinprasadhs']);
prReviewersTrustedPartners.set('UPDATE',['sachinprasadhs']);

CONSTENT_VALUES.MODULE.TRUSTEDPARTNERS = prReviewersTrustedPartners
module.exports = CONSTENT_VALUES
