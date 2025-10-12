import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';
describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
        const repositories = {
            totalCount: 2,
            edges: [
                {
                    node: {
                        id: 'repo1',
                        fullName: 'user1/repo1',
                        description: 'Repository 1 description',
                        language: 'JavaScript',
                        forksCount: 1500,
                        stargazersCount: 2100,
                        ratingAverage: 88,
                        reviewCount: 5,
                        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/1?v=4',
                    },
                },
                {
                    node: {
                        id: 'repo2',
                        fullName: 'user2/repo2',
                        description: 'Repository 2 description',
                        language: 'TypeScript',
                        forksCount: 300,
                        stargazersCount: 1200,
                        ratingAverage: 95,
                        reviewCount: 10,
                        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/2?v=4',
                    },
                },
            ],
        };

        const { getByText } = render(
            <RepositoryListContainer repositories={repositories} />
        );

        // First repository
        expect(getByText('user1/repo1')).toBeTruthy();
        expect(getByText('Repository 1 description')).toBeTruthy();
        expect(getByText('JavaScript')).toBeTruthy();
        expect(getByText('1.5k')).toBeTruthy();
        expect(getByText('2.1k')).toBeTruthy();
        expect(getByText('88')).toBeTruthy();
        expect(getByText('5')).toBeTruthy();

        // Second repository
        expect(getByText('user2/repo2')).toBeTruthy();
        expect(getByText('Repository 2 description')).toBeTruthy();
        expect(getByText('TypeScript')).toBeTruthy();
        expect(getByText('300')).toBeTruthy();
        expect(getByText('1.2k')).toBeTruthy();
        expect(getByText('95')).toBeTruthy();
        expect(getByText('10')).toBeTruthy();
    });
});