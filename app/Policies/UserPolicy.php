<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    protected function isSuperAdmin(User $user): bool
    {
        return $user->role === 'superadmin';
    }

    protected function isAdmin(User $user): bool
    {
        return $user->role === 'admin';
    }

    protected function isStaff(User $user): bool
    {
        return $this->isSuperAdmin($user) || $this->isAdmin($user);
    }

    public function viewAny(User $user): bool
    {
        return $this->isStaff($user);
    }

    public function view(User $user, User $model): bool
    {
        return $this->isStaff($user);
    }

    public function create(User $user): bool
    {
        return $this->isStaff($user);
    }

    public function update(User $user, User $model): bool
    {
        // superadmin boleh update siapa pun
        if ($this->isSuperAdmin($user)) {
            return true;
        }

        // admin tidak boleh update superadmin
        if ($this->isAdmin($user) && $model->role === 'superadmin') {
            return false;
        }

        // admin boleh update user lain (termasuk dirinya sendiri)
        return $this->isAdmin($user);
    }

    public function delete(User $user, User $model): bool
    {
        // superadmin: optional, cegah delete diri sendiri
        if ($this->isSuperAdmin($user)) {
            return $user->id !== $model->id;
        }

        if ($this->isAdmin($user)) {
            // admin tidak boleh delete superadmin & tidak boleh delete dirinya sendiri
            if ($model->role === 'superadmin') return false;
            if ($user->id === $model->id) return false;
            return true;
        }

        return false;
    }

    public function restore(User $user, User $model): bool
    {
        // superadmin boleh restore siapa pun
        if ($this->isSuperAdmin($user)) {
            return true;
        }

        // admin tidak boleh restore superadmin
        if ($this->isAdmin($user) && $model->role === 'superadmin') {
            return false;
        }

        return $this->isAdmin($user);
    }

    public function forceDelete(User $user, User $model): bool
    {
        // force delete hanya superadmin (optional cegah hapus diri sendiri)
        if ($this->isSuperAdmin($user)) {
            return $user->id !== $model->id;
        }

        return false;
    }
}
